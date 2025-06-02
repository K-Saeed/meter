import { Component } from '@angular/core';
import { DashboardUsersChartService } from './services/dashboard-users-chart.service';
import { DashboardSummary } from './dashboard-summary';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

 dashboardSummary!: DashboardSummary;

  constructor(private dashboardService: DashboardUsersChartService) { }

  ngOnInit(): void {
    this.getDashboardInfo();
    
  }

  getDashboardInfo(){
    this.dashboardService.getDashboardInfo().subscribe({
      next:(n)=>{
        this.dashboardSummary = n;
    console.log(this.dashboardSummary);
      },
      error:(e)=>{
        console.log(e);
      }
     })
  }

}
