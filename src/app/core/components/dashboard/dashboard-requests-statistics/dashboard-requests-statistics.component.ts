import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-dashboard-requests-statistics',
  templateUrl: './dashboard-requests-statistics.component.html',
  styleUrls: ['./dashboard-requests-statistics.component.css']
})
export class DashboardRequestsStatisticsComponent implements AfterViewInit {
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
          labels: ['Service', 'Job', 'Consultation', 'Proposal'],
          datasets: [{
            barThickness: 50,
            maxBarThickness: 100,
            minBarLength: 2,
            data: [10, 20, 55, 40],
            backgroundColor: "#F28F45",
            borderWidth: 0,
            borderRadius: 8,
          }]
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  return `${context.label}: ${context.raw}%`;
                }
              },
              backgroundColor: '#000',
              titleColor: '#FFF',
              bodyColor: '#FFF',
              borderColor: '#FFF',
              borderWidth: 1,
              padding: 10,
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
                callback: (value) => {
                  const validTicks = [10, 20, 30, 40, 50, 60];
                  const numValue = typeof value === 'number' ? value : parseFloat(value as string);
                  return validTicks.includes(numValue) ? `${numValue}%` : '';
                },
                color: '#000',
                font: {
                  size: 8,
                  weight: 400,
                }
              }
            },
            x: {
              grid: {
                display: false
              },
              ticks: {
                color: '#F28F45',
                font: {
                  size: 12,
                  weight: 400,
                }
              }
            }
          }
        }
      });
    }
  }
}
