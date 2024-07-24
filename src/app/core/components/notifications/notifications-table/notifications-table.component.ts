import { Component } from '@angular/core';

@Component({
  selector: 'app-notifications-table',
  templateUrl: './notifications-table.component.html',
  styleUrls: ['./notifications-table.component.css']
})
export class NotificationsTableComponent {
  selectAll: boolean = false;
  users = [
    { id: '20', title: 'Service Update', message: '"New features available..."',Recipients: 'All Users', dateSent: 'September 21, 2013', typeOfService: 'Consolation', status: 'Sent', selected: false },
    { id: '20', title: 'Service Update', message: '"New features available..."',Recipients: 'Providers', dateSent: 'September 21, 2013', typeOfService: 'Service', status: 'Scheduled', selected: true },
    { id: '20', title: 'MonGe Office', message: '"New features available..."',Recipients: 'Providers', dateSent: 'September 21, 2013', typeOfService: 'Service', status: 'Scheduled', selected: true },
    { id: '20', title: 'MonGe Office', message: '"New features available..."',Recipients: 'All Users', dateSent: 'September 21, 2013', typeOfService: 'Consolation', status: 'Sent', selected: false },
    { id: '20', title: 'Service Update', message: '"New features available..."',Recipients: 'Providers', dateSent: 'September 21, 2013', typeOfService: 'Service', status: 'Scheduled', selected: true },
    { id: '20', title: 'Service Update', message: '"New features available..."',Recipients: 'Providers', dateSent: 'September 21, 2013', typeOfService: 'Service', status: 'Scheduled', selected: true },
    { id: '20', title: 'Service Update', message: '"New features available..."',Recipients: 'All Users', dateSent: 'September 21, 2013', typeOfService: 'Service', status: 'Scheduled', selected: true },
    { id: '20', title: 'Service Update', message: '"New features available..."',Recipients: 'Providers', dateSent: 'September 21, 2013', typeOfService: 'Service', status: 'Scheduled', selected: true },
    { id: '20', title: 'Service Update', message: '"New features available..."',Recipients: 'Providers', dateSent: 'September 21, 2013', typeOfService: 'Service', status: 'Scheduled', selected: true },
    { id: '20', title: 'Service Update', message: '"New features available..."',Recipients: 'Providers', dateSent: 'September 21, 2013', typeOfService: 'Service', status: 'Scheduled', selected: true },
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
