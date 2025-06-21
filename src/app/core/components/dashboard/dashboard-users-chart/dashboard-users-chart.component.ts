import { Component, ElementRef, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DashboardUsersChartService } from '../services/dashboard-users-chart.service';
import { DashboardSummary } from '../dashboard-summary';

@Component({
  selector: 'app-dashboard-users-chart',
  templateUrl: './dashboard-users-chart.component.html',
  styleUrls: ['./dashboard-users-chart.component.css']
})
export class DashboardUsersChartComponent implements OnChanges {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;
  chart!: Chart;

  @Input() dashboardSummary!: DashboardSummary;

  totalUsers = 0;
  totalCustomers = 0;
  totalProviders = 0;
  totalSellers = 0;

  customerGrowth = 0;
  providerGrowth = 0;
  sellerGrowth = 0;

  constructor(private dashboardUsersChartService: DashboardUsersChartService) {
    Chart.register(...registerables);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dashboardSummary'] && this.dashboardSummary) {
      const currentYear = new Date().getFullYear();

      this.dashboardUsersChartService.getUserDashboardData(currentYear).subscribe(data => {
        setTimeout(() => {
          this.createChart(data);
          this.calculateTotalUsers(data);
          this.calculateGrowthRates(data);
        }, 0);
      });
    }
  }

  createChart(data: any): void {
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const usersData = this.dashboardSummary?.usersCountPerMonth || [];

    const customersData = months.map(month => usersData.find(item => item.month === month)?.customers ?? 0);
    const providersData = months.map(month => usersData.find(item => item.month === month)?.providers ?? 0);
    const sellersData = months.map(month => usersData.find(item => item.month === month)?.sellers ?? 0);

    if (this.chartCanvas) {
      const canvas = this.chartCanvas.nativeElement;

      if (this.chart) {
        this.chart.destroy(); 
      }

      this.chart = new Chart(canvas, {
        type: 'bar',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [
            {
              label: 'Customers',
              data: customersData,
              backgroundColor: '#FF7A00',
              borderWidth: 1,
              borderRadius: 4,
              barThickness: 15,
              categoryPercentage: 0.6,
              barPercentage: 0.8,
              stack: 'stack1',
            },
            {
              label: 'Providers',
              data: providersData,
              backgroundColor: '#FFB703',
              borderWidth: 1,
              borderRadius: 4,
              barThickness: 15,
              categoryPercentage: 0.6,
              barPercentage: 0.8,
              stack: 'stack2',
            },
            {
              label: 'Sellers',
              data: sellersData,
              backgroundColor: '#32383F',
              borderWidth: 1,
              borderRadius: 4,
              barThickness: 15,
              categoryPercentage: 0.6,
              barPercentage: 0.8,
              stack: 'stack3',
            },
          ]
        },
        options: {
          plugins: {
            legend: {
              display: true,
              position: 'top',
              labels: {
                padding: 20,
                font: {
                  size: 12,
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              stacked: true,
              grid: {
                color: '#E5E5E5',
              },
              ticks: {
                display: false
              }
            },
            x: {
              stacked: false,
              border: {
                dash: [3],
              },
              grid: {
                color: '#E5E5E5',
              }
            }
          }
        }
      });
    }
  }

  calculateTotalUsers(data: any): void {
    const months = Object.keys(data.monthlyData);
    this.totalUsers = 0;
    this.totalCustomers = 0;
    this.totalProviders = 0;
    this.totalSellers = 0;

    for (let month of months) {
      const { customers = 0, providers = 0, sellers = 0 } = data.monthlyData[month];
      this.totalCustomers += customers;
      this.totalProviders += providers;
      this.totalSellers += sellers;
      this.totalUsers += customers + providers + sellers;
    }
  }

  calculateGrowthRates(data: any): void {
    const months = Object.keys(data.monthlyData);
    if (months.length > 1) {
      const lastMonth = data.monthlyData[months[months.length - 1]];
      const prevMonth = data.monthlyData[months[months.length - 2]];

      this.customerGrowth = this.calculatePercentageChange(lastMonth.customers, prevMonth.customers);
      this.providerGrowth = this.calculatePercentageChange(lastMonth.providers, prevMonth.providers);
      this.sellerGrowth = this.calculatePercentageChange(lastMonth.sellers, prevMonth.sellers);
    }
  }

  calculatePercentageChange(current: number, previous: number): number {
    if (!previous || previous === 0) return 100;
    return Math.round(((current - previous) / previous) * 100);
  }
}
