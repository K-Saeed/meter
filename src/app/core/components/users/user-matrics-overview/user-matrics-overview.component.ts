import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-user-matrics-overview',
  templateUrl: './user-matrics-overview.component.html',
  styleUrls: ['./user-matrics-overview.component.css']
})
export class UserMatricsOverviewComponent implements OnInit {
  totalCustomersChart: any;
  newCustomersChart: any;
  activeCustomersChart: any;

  ngOnInit(): void {
    this.initializeCharts();
  }

  initializeCharts(): void {
    // Total Customers Chart
    this.totalCustomersChart = new Chart("totalCustomersChart", {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          data: [3000, 3100, 3150, 3200, 3250, 3300],
          borderColor: '#f28f45',
          backgroundColor: 'rgba(255,165,0,0.1)', // Lighter fill
          fill: true,
          tension: 0.4, // Smooth line
          borderWidth: 2,
          pointRadius: 0, // Remove points
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // Allows the chart to be resized properly
        scales: {
          x: {
            display: false // Hide x-axis
          },
          y: {
            display: false // Hide y-axis
          }
        },
        plugins: {
          legend: {
            display: false // Hide legend
          },
          tooltip: {
            enabled: false // Disable tooltips
          }
        }
      }
    });

    // New Customers Chart
    this.newCustomersChart = new Chart("newCustomersChart", {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          data: [30, 40, 35, 50, 45, 50],
          borderColor: '#f20b7a',
          backgroundColor: '#f20b7a14', // Lighter fill
          fill: true,
          tension: 0.4, // Smooth line
          borderWidth: 2,
          pointRadius: 0, // Remove points
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // Allows the chart to be resized properly
        scales: {
          x: {
            display: false // Hide x-axis
          },
          y: {
            display: false // Hide y-axis
          }
        },
        plugins: {
          legend: {
            display: false // Hide legend
          },
          tooltip: {
            enabled: false // Disable tooltips
          }
        }
      }
    });

    // Active Customers Chart
    this.activeCustomersChart = new Chart("activeCustomersChart", {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          data: [350, 360, 370, 380, 390, 400],
          borderColor: '#08DCCF',
          backgroundColor: 'rgba(0,255,255,0.1)', // Lighter fill
          fill: true,
          tension: 0.4, // Smooth line
          borderWidth: 2,
          pointRadius: 0, // Remove points
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // Allows the chart to be resized properly
        scales: {
          x: {
            display: false // Hide x-axis
          },
          y: {
            display: false // Hide y-axis
          }
        },
        plugins: {
          legend: {
            display: false // Hide legend
          },
          tooltip: {
            enabled: false // Disable tooltips
          }
        }
      }
    });
  }
}
