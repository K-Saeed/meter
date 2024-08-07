import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-dashboard-requests-statistics',
  templateUrl: './dashboard-requests-statistics.component.html',
  styleUrls: ['./dashboard-requests-statistics.component.css']
})
export class DashboardRequestsStatisticsComponent implements AfterViewInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;
  chart!: Chart<'polarArea', number[], string>;  // تحديد نوع الرسم البياني بشكل صحيح

  constructor() {
    Chart.register(...registerables);
  }

  ngAfterViewInit(): void {
    this.createChart();
  }

  createChart(): void {
    if (this.chartCanvas) {
      const canvas = this.chartCanvas.nativeElement;
      this.chart = new Chart<'polarArea', number[], string>(canvas, {
        type: 'polarArea',
        data: {
          labels: ['service requests', 'job requests', 'Proposals', 'consultation requests'],
          datasets: [
            {
              label: 'Requests',
              data: [30, 35, 28, 25],
              backgroundColor: ['#16DBCC', '#FFBB38', '#4C78FF', '#FF82AC'],
              borderWidth: 10,
            },
          ]
        },
        options: {
          scales: {

            r: {
              grid: {
                display: false 
              },
              angleLines: {
                display: false 
              },
              ticks: {
                display: false
              }
            }
          },
          plugins: {
            legend: {
              display: false,
              labels: {
                padding: 20,
                font: {
                  size: 12,
                  weight: 400,
                }
              }
            }
          },
          responsive: true,
          maintainAspectRatio: false,
        }
      });
    }
  }
}
