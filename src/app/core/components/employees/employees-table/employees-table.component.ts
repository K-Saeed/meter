import { Component } from '@angular/core';

@Component({
  selector: 'app-employees-table',
  templateUrl: './employees-table.component.html',
  styleUrls: ['./employees-table.component.css']
})
export class EmployeesTableComponent {
  selectAll: boolean = false;
  users = [
    { id: '20', name: 'Mohamede MonGe', role: 'Admin', registered: 'September 21, 2013', phonenumber: '(966) 555-0128', status: 'Approved', selected: false },
    { id: '20', name: 'Mohamede MonGe', role: 'Modrtetor', registered: 'September 21, 2013', phonenumber: '(966) 555-0128', status: 'Rejected', selected: false },
    { id: '20', name: 'Mohamede MonGe', role: 'Admin', registered: 'September 21, 2013', phonenumber: '(966) 555-0128', status: 'Pending', selected: true },
    { id: '20', name: 'Mohamede MonGe', role: 'Modrtetor', registered: 'September 21, 2013', phonenumber: '(966) 555-0128', status: 'Pending', selected: true },
    { id: '20', name: 'Mohamede MonGe', role: 'Admin', registered: 'September 21, 2013', phonenumber: '(966) 555-0128', status: 'Approved', selected: false },
    { id: '20', name: 'Mohamede MonGe', role: 'Modrtetor', registered: 'September 21, 2013', phonenumber: '(966) 555-0128', status: 'Rejected', selected: false },
    { id: '20', name: 'Mohamede MonGe', role: 'Modrtetor', registered: 'September 21, 2013', phonenumber: '(966) 555-0128', status: 'Pending', selected: true },
    { id: '20', name: 'Mohamede MonGe', role: 'Admin', registered: 'September 21, 2013', phonenumber: '(966) 555-0128', status: 'Pending', selected: true },
    { id: '20', name: 'Mohamede MonGe', role: 'Modrtetor', registered: 'September 21, 2013', phonenumber: '(966) 555-0128', status: 'Pending', selected: true },
    { id: '20', name: 'Mohamede MonGe', role: 'Admin', registered: 'September 21, 2013', phonenumber: '(966) 555-0128', status: 'Pending', selected: true },
    { id: '20', name: 'Mohamede MonGe', role: 'Modrtetor', registered: 'September 21, 2013', phonenumber: '(966) 555-0128', status: 'Pending', selected: true },
    { id: '20', name: 'Mohamede MonGe', role: 'Admin', registered: 'September 21, 2013', phonenumber: '(966) 555-0128', status: 'Pending', selected: true },
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
