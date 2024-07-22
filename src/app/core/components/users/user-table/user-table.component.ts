import { Component } from '@angular/core';
interface User {
  name: string;
  email: string;
  role: string;
  registered: string;
  address: string;
  phone: string;
  spent: string;
  selected: boolean;
}
@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent {
  selectAll: boolean = false;
  users = [
    { name: 'Mohamede MonGe', email: 'monge7@mail.com', role: 'Customers', registered: 'September 21, 2013', address: '30 ahmed st. - makka - saudi arabia', phone: '(966) 555-0128', spent: '$7687.6', selected: true },
    { name: 'Mohamede MonGe', email: 'monge7@mail.com', role: 'Customers', registered: 'September 21, 2013', address: '30 ahmed st. - makka - saudi arabia', phone: '(966) 555-0128', spent: '$7687.6', selected: false },
    { name: 'Mohamede MonGe', email: 'monge7@mail.com', role: 'Customers', registered: 'September 21, 2013', address: '30 ahmed st. - makka - saudi arabia', phone: '(966) 555-0128', spent: '$7687.6', selected: false },
    { name: 'Mohamede MonGe', email: 'monge7@mail.com', role: 'Customers', registered: 'September 21, 2013', address: '30 ahmed st. - makka - saudi arabia', phone: '(966) 555-0128', spent: '$7687.6', selected: false },
    { name: 'Mohamede MonGe', email: 'monge7@mail.com', role: 'Customers', registered: 'September 21, 2013', address: '30 ahmed st. - makka - saudi arabia', phone: '(966) 555-0128', spent: '$7687.6', selected: false },
    { name: 'Mohamede MonGe', email: 'monge7@mail.com', role: 'Customers', registered: 'September 21, 2013', address: '30 ahmed st. - makka - saudi arabia', phone: '(966) 555-0128', spent: '$7687.6', selected: false },
    { name: 'Mohamede MonGe', email: 'monge7@mail.com', role: 'Customers', registered: 'September 21, 2013', address: '30 ahmed st. - makka - saudi arabia', phone: '(966) 555-0128', spent: '$7687.6', selected: false },
    { name: 'Mohamede MonGe', email: 'monge7@mail.com', role: 'Customers', registered: 'September 21, 2013', address: '30 ahmed st. - makka - saudi arabia', phone: '(966) 555-0128', spent: '$7687.6', selected: false },
    { name: 'Mohamede MonGe', email: 'monge7@mail.com', role: 'Customers', registered: 'September 21, 2013', address: '30 ahmed st. - makka - saudi arabia', phone: '(966) 555-0128', spent: '$7687.6', selected: false },
    { name: 'Mohamede MonGe', email: 'monge7@mail.com', role: 'Customers', registered: 'September 21, 2013', address: '30 ahmed st. - makka - saudi arabia', phone: '(966) 555-0128', spent: '$7687.6', selected: false },
    { name: 'Mohamede MonGe', email: 'monge7@mail.com', role: 'Customers', registered: 'September 21, 2013', address: '30 ahmed st. - makka - saudi arabia', phone: '(966) 555-0128', spent: '$7687.6', selected: false },
    { name: 'Mohamede MonGe', email: 'monge7@mail.com', role: 'Customers', registered: 'September 21, 2013', address: '30 ahmed st. - makka - saudi arabia', phone: '(966) 555-0128', spent: '$7687.6', selected: false },
    { name: 'Mohamede MonGe', email: 'monge7@mail.com', role: 'Customers', registered: 'September 21, 2013', address: '30 ahmed st. - makka - saudi arabia', phone: '(966) 555-0128', spent: '$7687.6', selected: false },
    { name: 'Mohamede MonGe', email: 'monge7@mail.com', role: 'Customers', registered: 'September 21, 2013', address: '30 ahmed st. - makka - saudi arabia', phone: '(966) 555-0128', spent: '$7687.6', selected: false },
    { name: 'Mohamede MonGe', email: 'monge7@mail.com', role: 'Customers', registered: 'September 21, 2013', address: '30 ahmed st. - makka - saudi arabia', phone: '(966) 555-0128', spent: '$7687.6', selected: false },
    { name: 'Mohamede MonGe', email: 'monge7@mail.com', role: 'Customers', registered: 'September 21, 2013', address: '30 ahmed st. - makka - saudi arabia', phone: '(966) 555-0128', spent: '$7687.6', selected: false },
  ];
  currentPage: number = 1;
  itemsPerPage: number = 4;
  Math = Math;

  toggleAll() {
    this.users.forEach(user => user.selected = this.selectAll);
  }

  checkIfAllSelected() {
    this.selectAll = this.users.every(user => user.selected);
  }

  toggleUser(user:User) {
    user.selected = !user.selected;
    this.checkIfAllSelected();
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
