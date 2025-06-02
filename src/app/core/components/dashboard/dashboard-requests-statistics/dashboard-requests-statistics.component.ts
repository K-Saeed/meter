import { Component, AfterViewInit, ElementRef, ViewChild, Input, SimpleChanges } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DashboardSummary } from '../dashboard-summary';

@Component({
  selector: 'app-dashboard-requests-statistics',
  templateUrl: './dashboard-requests-statistics.component.html',
  styleUrls: ['./dashboard-requests-statistics.component.css']
})
export class DashboardRequestsStatisticsComponent implements AfterViewInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;
  chart!: Chart;

  @Input() dashboardSummary!: DashboardSummary;

  servicesPercent = 60;
  jobsPercent = 10;
  consultationsPercent = 30;

  constructor() {
    Chart.register(...registerables);
  }

 
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dashboardSummary'] && this.dashboardSummary) {
      this.calaculatePercentages();
      this.createChart();
    }
  }
  
  ngAfterViewInit(): void {    
    // this.createChart();
  }

  calaculatePercentages() {
    console.log(this.dashboardSummary);
    
    if (this.dashboardSummary) {
      const total = this.dashboardSummary.totalRequests;

      this.servicesPercent = total ? Math.round((this.dashboardSummary.services ?? 0) / total * 100) : 0;
      this.jobsPercent = total ? Math.round((this.dashboardSummary.jobs ?? 0) / total * 100) : 0;
      this.consultationsPercent = total ? Math.round((this.dashboardSummary.consultations ?? 0) / total * 100) : 0;
  
      console.log('Services %:', this.servicesPercent);
      console.log('Jobs %:', this.jobsPercent);
      console.log('Consultations %:', this.consultationsPercent);
    }
  }

  createChart(): void {
    if (this.chartCanvas) {
      const canvas = this.chartCanvas.nativeElement;
      this.chart = new Chart(canvas, {
        type: 'bar',
        data: {
          labels: ['Service', 'Job', 'Consultation'
            // , 'Proposal'
          ],
          datasets: [{
            barThickness: 50,
            maxBarThickness: 100,
            minBarLength: 2,
            data: [this.servicesPercent, this.jobsPercent, this.consultationsPercent],
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
                  const validTicks = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
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
