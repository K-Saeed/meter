import { AbsoluteSourceSpan } from '@angular/compiler';
import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-dashboard-users-chart',
  templateUrl: './dashboard-users-chart.component.html',
  styleUrls: ['./dashboard-users-chart.component.css']
})
export class DashboardUsersChartComponent implements AfterViewInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;
  chart!: Chart;

  constructor() {
    Chart.register(...registerables);
  }

  ngAfterViewInit(): void {
    this.createChart();
  }

  createChart(): void {
    if (this.chartCanvas) {
      const canvas = this.chartCanvas.nativeElement;
      this.chart = new Chart(canvas, {
        type: 'bar',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [
            {
              label: 'Customers',
              data: [60, 20, 10, 25, 30, 15, 20, 35],
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
              data: [20, 20, 10, 15, 25, 20, 15, 30],
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
              data: [10, 20, 10, 5, 15, 10, 20, 25],
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
              border: {
                dash: [3],
              },
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
}
