import { Component, Input } from '@angular/core';
import { DashboardSummary } from '../dashboard-summary';

@Component({
  selector: 'app-dashboard-cards',
  templateUrl: './dashboard-cards.component.html',
  styleUrls: ['./dashboard-cards.component.css']
})
export class DashboardCardsComponent {

  @Input() dashboardSummary!: DashboardSummary;

}
