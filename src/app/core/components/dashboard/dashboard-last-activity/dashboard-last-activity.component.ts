import { Component, Input } from '@angular/core';
import { DashboardSummary } from '../dashboard-summary';

@Component({
  selector: 'app-dashboard-last-activity',
  templateUrl: './dashboard-last-activity.component.html',
  styleUrls: ['./dashboard-last-activity.component.css']
})
export class DashboardLastActivityComponent {
  @Input() dashboardSummary!: DashboardSummary;

}
