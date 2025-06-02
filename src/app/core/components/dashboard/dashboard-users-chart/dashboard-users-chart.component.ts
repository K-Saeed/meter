import { Component, AfterViewInit, ElementRef, ViewChild, Input } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DashboardUsersChartService } from '../services/dashboard-users-chart.service';
import { DashboardSummary } from '../dashboard-summary';

@Component({
  selector: 'app-dashboard-users-chart',
  templateUrl: './dashboard-users-chart.component.html',
  styleUrls: ['./dashboard-users-chart.component.css']
})
export class DashboardUsersChartComponent implements AfterViewInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;
  chart!: Chart;

  @Input() dashboardSummary!: DashboardSummary;

  totalUsers: number = 0;
  totalCustomers: number = 0;
  totalProviders: number = 0;
  totalSellers: number = 0;

  customerGrowth: number = 0;
  providerGrowth: number = 0;
  sellerGrowth: number = 0;

  constructor(private dashboardUsersChartService: DashboardUsersChartService) {
    Chart.register(...registerables);
  }

  ngAfterViewInit(): void {
    const currentYear = new Date().getFullYear();

    this.dashboardUsersChartService.getUserDashboardData(currentYear).subscribe(data => {
      this.createChart(data);
      this.calculateTotalUsers(data);
      this.calculateGrowthRates(data); // Calculate percentage change
    });
  }

  createChart(data: any): void {
    const months = Object.keys(data.monthlyData);
    const customersData = months.map(month => this.dashboardSummary?.customers || 0);
    const providersData = months.map(month => this.dashboardSummary?.providers || 0);
    const sellersData = months.map(month => this.dashboardSummary?.sellers || 0);

    if (this.chartCanvas) {
      const canvas = this.chartCanvas.nativeElement;
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
                padding:20,
                // color: '#333',
                font: {
                  size: 12,
                  weight: 400,
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
    this.totalUsers = months.reduce((sum, month) => {
      const { customers, providers, sellers } = data.monthlyData[month];
      this.totalCustomers += customers || 0;
      this.totalProviders += providers || 0;
      this.totalSellers += sellers || 0;
      return sum + customers + providers + sellers;
    }, 0);
  }

  calculateGrowthRates(data: any): void {
    const months = Object.keys(data.monthlyData);
    if (months.length > 1) {
      const lastMonth = data.monthlyData[months[months.length - 1]];
      const previousMonth = data.monthlyData[months[months.length - 2]];

      this.customerGrowth = this.calculatePercentageChange(this.dashboardSummary?.customers??0, 0);
      this.providerGrowth = this.calculatePercentageChange(this.dashboardSummary?.providers??0, 0);
      this.sellerGrowth = this.calculatePercentageChange(this.dashboardSummary?.sellers??0, 0);
    }
  }

  calculatePercentageChange(current: number, previous: number): number {
    if (previous === 0) return 100; // If no users previously, return 100% increase
    return ((current - previous) / previous) * 100;
  }
}
