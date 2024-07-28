import { Component } from '@angular/core';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css']
})
export class ProductsTableComponent {
  selectAll: boolean = false;
  users = [
    { id: '20', customerName: 'Construction Tool', requestTitle: 'Mohamed MonGe', dateSubmitted: 'September 21, 2013', typeOfService: 'Consolation', status: 'Approved', selected: false },
    { id: '20', customerName: 'Construction Tool', requestTitle: 'Mohamed MonGe', dateSubmitted: 'September 21, 2013', typeOfService: 'Engineering Job', status: 'Rejected', selected: false },
    { id: '20', customerName: 'Construction Tool', requestTitle: 'Mohamed MonGe', dateSubmitted: 'September 21, 2013', typeOfService: 'Service', status: 'Pending', selected: true },
    { id: '20', customerName: 'Construction Tool', requestTitle: 'Mohamed MonGe', dateSubmitted: 'September 21, 2013', typeOfService: 'Service', status: 'Pending', selected: true },
    { id: '20', customerName: 'Construction Tool', requestTitle: 'Mohamed MonGe', dateSubmitted: 'September 21, 2013', typeOfService: 'Consolation', status: 'Approved', selected: false },
    { id: '20', customerName: 'Construction Tool', requestTitle: 'Mohamed MonGe', dateSubmitted: 'September 21, 2013', typeOfService: 'Engineering Job', status: 'Rejected', selected: false },
    { id: '20', customerName: 'Construction Tool', requestTitle: 'Mohamed MonGe', dateSubmitted: 'September 21, 2013', typeOfService: 'Service', status: 'Pending', selected: true },
    { id: '20', customerName: 'Construction Tool', requestTitle: 'Mohamed MonGe', dateSubmitted: 'September 21, 2013', typeOfService: 'Service', status: 'Pending', selected: true },
    { id: '20', customerName: 'Construction Tool', requestTitle: 'Mohamed MonGe', dateSubmitted: 'September 21, 2013', typeOfService: 'Service', status: 'Pending', selected: true },
    { id: '20', customerName: 'Construction Tool', requestTitle: 'Mohamed MonGe', dateSubmitted: 'September 21, 2013', typeOfService: 'Service', status: 'Pending', selected: true },
    { id: '20', customerName: 'Construction Tool', requestTitle: 'Mohamed MonGe', dateSubmitted: 'September 21, 2013', typeOfService: 'Service', status: 'Pending', selected: true },
    { id: '20', customerName: 'Construction Tool', requestTitle: 'Mohamed MonGe', dateSubmitted: 'September 21, 2013', typeOfService: 'Service', status: 'Pending', selected: true },
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
