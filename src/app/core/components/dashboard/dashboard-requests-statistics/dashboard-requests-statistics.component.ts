import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  Input,
  SimpleChanges,
  OnDestroy
} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DashboardSummary } from '../dashboard-summary';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-requests-statistics',
  templateUrl: './dashboard-requests-statistics.component.html',
  styleUrls: ['./dashboard-requests-statistics.component.css']
})
export class DashboardRequestsStatisticsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;
  chart!: Chart;

  @Input() dashboardSummary!: DashboardSummary;

  servicesPercent = 60;
  jobsPercent = 10;
  consultationsPercent = 30;

  private langChangeSub!: Subscription;

  constructor(private translateService: TranslateService) {
    Chart.register(...registerables);

    this.langChangeSub = this.translateService.onLangChange.subscribe(
      (event: LangChangeEvent) => {
        this.createChart(); // إعادة رسم الشارت عند تغيير اللغة
      }
    );
  }

  ngOnDestroy(): void {
    if (this.langChangeSub) {
      this.langChangeSub.unsubscribe();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dashboardSummary'] && this.dashboardSummary) {
      this.calaculatePercentages();
      this.createChart();
    }
  }

  ngAfterViewInit(): void {
    // intentionally left blank
  }

  calaculatePercentages() {
    if (this.dashboardSummary) {
      const total = this.dashboardSummary.totalRequests;
      this.servicesPercent = total ? Math.round((this.dashboardSummary.services ?? 0) / total * 100) : 0;
      this.jobsPercent = total ? Math.round((this.dashboardSummary.jobs ?? 0) / total * 100) : 0;
      this.consultationsPercent = total ? Math.round((this.dashboardSummary.consultations ?? 0) / total * 100) : 0;
    }
  }

  createChart(): void {
    if (this.chartCanvas) {
      const canvas = this.chartCanvas.nativeElement;
      const isArabic = this.translateService.currentLang === 'ar';

      const labels = isArabic
        ? [
          this.translateService.instant('consultation'),
          this.translateService.instant('job'),
          this.translateService.instant('service')
        ]
        : [
          this.translateService.instant('service'),
          this.translateService.instant('job'),
          this.translateService.instant('consultation')
        ];

      const data = isArabic
        ? [this.consultationsPercent, this.jobsPercent, this.servicesPercent]
        : [this.servicesPercent, this.jobsPercent, this.consultationsPercent];

      if (this.chart) {
        this.chart.destroy(); 
      }

      this.chart = new Chart(canvas, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            barThickness: 50,
            maxBarThickness: 100,
            minBarLength: 2,
            data: data,
            backgroundColor: "#F28F45",
            borderWidth: 0,
            borderRadius: 8,
          }]
        },
        options: {
          indexAxis: 'x',
          layout: { padding: { left: 0, right: 0 } },
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const rawValue = context.raw as number | string;
                  const value = this.localizeNumber(rawValue);
                  return `${context.label}: ${value}%`;
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
            x: {
              grid: { display: false },
              ticks: {
                color: '#F28F45',
                font: {
                  size: 12,
                  weight: 400 as const
                },
              }
            },
            y: {
              beginAtZero: true,
              stacked: true,
              position: isArabic ? 'right' : 'left',
              grid: {
                color: '#E5E5E5',
                drawTicks: true,
                drawOnChartArea: true
              },
              ticks: {
                callback: (value) => {
                  const validTicks = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
                  const numValue = typeof value === 'number' ? value : parseFloat(value as string);
                  return validTicks.includes(numValue) ? `${this.localizeNumber(numValue)}%` : '';
                },
                color: '#000',
                font: {
                  size: 8,
                  weight: 400 as const
                }
              }
            }
          }
        }
      });
    }
  }

  localizeNumber(value: number | string): string {
    if (this.translateService.currentLang === 'ar') {
      return value.toString().replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[+d]);
    }
    return value.toString();
  }
}
