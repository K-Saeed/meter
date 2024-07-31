import { Component } from '@angular/core';

@Component({
  selector: 'app-work-submission-table',
  templateUrl: './work-submission-table.component.html',
  styleUrls: ['./work-submission-table.component.css']
})
export class WorkSubmissionTableComponent {
  selectAll: boolean = false;
  users = [
    { id: '20', Project: 'Survey Project', Provider: 'Mohamed MonGe',Customer: 'Mohamed MonGe', dateSubmitted: 'September 21, 2013', typeOfService: 'Consolation', status: 'Approved', selected: false },
    { id: '20', Project: 'Survey Project', Provider: 'Mohamed MonGe',Customer: 'Mohamed MonGe', dateSubmitted: 'September 21, 2013', typeOfService: 'Engineering Job', status: 'Rejected', selected: false },
    { id: '20', Project: 'Survey Project', Provider: 'Mohamed MonGe',Customer: 'Mohamed MonGe', dateSubmitted: 'September 21, 2013', typeOfService: 'Service', status: 'Pending', selected: true },
    { id: '20', Project: 'Survey Project', Provider: 'Mohamed MonGe',Customer: 'Mohamed MonGe', dateSubmitted: 'September 21, 2013', typeOfService: 'Service', status: 'Pending', selected: true },
    { id: '20', Project: 'Survey Project', Provider: 'Mohamed MonGe',Customer: 'Mohamed MonGe', dateSubmitted: 'September 21, 2013', typeOfService: 'Consolation', status: 'Approved', selected: false },
    { id: '20', Project: 'Survey Project', Provider: 'Mohamed MonGe',Customer: 'Mohamed MonGe', dateSubmitted: 'September 21, 2013', typeOfService: 'Engineering Job', status: 'Rejected', selected: false },
    { id: '20', Project: 'Survey Project', Provider: 'Mohamed MonGe',Customer: 'Mohamed MonGe', dateSubmitted: 'September 21, 2013', typeOfService: 'Service', status: 'Pending', selected: true },
    { id: '20', Project: 'Survey Project', Provider: 'Mohamed MonGe',Customer: 'Mohamed MonGe', dateSubmitted: 'September 21, 2013', typeOfService: 'Service', status: 'Pending', selected: true },
    { id: '20', Project: 'Survey Project', Provider: 'Mohamed MonGe',Customer: 'Mohamed MonGe', dateSubmitted: 'September 21, 2013', typeOfService: 'Service', status: 'Pending', selected: true },
    { id: '20', Project: 'Survey Project', Provider: 'Mohamed MonGe',Customer: 'Mohamed MonGe', dateSubmitted: 'September 21, 2013', typeOfService: 'Service', status: 'Pending', selected: true },
    { id: '20', Project: 'Survey Project', Provider: 'Mohamed MonGe',Customer: 'Mohamed MonGe', dateSubmitted: 'September 21, 2013', typeOfService: 'Service', status: 'Pending', selected: true },
    { id: '20', Project: 'Survey Project', Provider: 'Mohamed MonGe',Customer: 'Mohamed MonGe', dateSubmitted: 'September 21, 2013', typeOfService: 'Service', status: 'Pending', selected: true },
  ];

  currentPage: number = 1;
  itemsPerPage: number = 4;
  Math = Math;

  toggleAll(event: Event) {
    event.preventDefault();
    this.users.forEach(user => user.selected = this.selectAll);
  }

  checkIfAllSelected() {
    this.selectAll = this.users.every(user => user.selected);
  }

  get paginatedUsers() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.users.slice(start, end);
  }

  setPage(page: number, event: Event) {
    event.preventDefault();
    this.currentPage = page;
  }
}
