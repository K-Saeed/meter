import { Component } from '@angular/core';

@Component({
  selector: 'app-user-unfinished-table',
  templateUrl: './user-unfinished-table.component.html',
  styleUrls: ['./user-unfinished-table.component.css']
})
export class UserUnfinishedTableComponent {
  selectAll: boolean = false;
  users = [
    { id: '20', name: 'Mohamede MonGe',email: 'monge7@mail.com', role: 'Customers', registered: 'September 21, 2013',address:'--', phonenumber: '(966) 555-0128',spent: '--',status: '--' },
    { id: '20', name: 'Mohamede MonGe',email: 'monge7@mail.com', role: 'Customers', registered: 'September 21, 2013',address:'--', phonenumber: '(966) 555-0128',spent: '--',status: '--' },
    { id: '20', name: 'Mohamede MonGe',email: 'monge7@mail.com', role: 'Customers', registered: 'September 21, 2013',address:'--', phonenumber: '(966) 555-0128',spent: '--',status: '--' },
    { id: '20', name: 'Mohamede MonGe',email: 'monge7@mail.com', role: 'Customers', registered: 'September 21, 2013',address:'--', phonenumber: '(966) 555-0128',spent: '--',status: '--' },
    { id: '20', name: 'Mohamede MonGe',email: 'monge7@mail.com', role: 'Customers', registered: 'September 21, 2013',address:'--', phonenumber: '(966) 555-0128',spent: '--',status: '--' },
    { id: '20', name: 'Mohamede MonGe',email: 'monge7@mail.com', role: 'Customers', registered: 'September 21, 2013',address:'--', phonenumber: '(966) 555-0128',spent: '--',status: '--' },
    { id: '20', name: 'Mohamede MonGe',email: 'monge7@mail.com', role: 'Customers', registered: 'September 21, 2013',address:'--', phonenumber: '(966) 555-0128',spent: '--',status: '--' },
    { id: '20', name: 'Mohamede MonGe',email: 'monge7@mail.com', role: 'Customers', registered: 'September 21, 2013',address:'--', phonenumber: '(966) 555-0128',spent: '--',status: '--' },
    { id: '20', name: 'Mohamede MonGe',email: 'monge7@mail.com', role: 'Customers', registered: 'September 21, 2013',address:'--', phonenumber: '(966) 555-0128',spent: '--',status: '--' },
    { id: '20', name: 'Mohamede MonGe',email: 'monge7@mail.com', role: 'Customers', registered: 'September 21, 2013',address:'--', phonenumber: '(966) 555-0128',spent: '--',status: '--' },
    { id: '20', name: 'Mohamede MonGe',email: 'monge7@mail.com', role: 'Customers', registered: 'September 21, 2013',address:'--', phonenumber: '(966) 555-0128',spent: '--',status: '--' },
    { id: '20', name: 'Mohamede MonGe',email: 'monge7@mail.com', role: 'Customers', registered: 'September 21, 2013',address:'--', phonenumber: '(966) 555-0128',spent: '--',status: '--' },
    { id: '20', name: 'Mohamede MonGe',email: 'monge7@mail.com', role: 'Customers', registered: 'September 21, 2013',address:'--', phonenumber: '(966) 555-0128',spent: '--',status: '--' },
    { id: '20', name: 'Mohamede MonGe',email: 'monge7@mail.com', role: 'Customers', registered: 'September 21, 2013',address:'--', phonenumber: '(966) 555-0128',spent: '--',status: '--' },
    { id: '20', name: 'Mohamede MonGe',email: 'monge7@mail.com', role: 'Customers', registered: 'September 21, 2013',address:'--', phonenumber: '(966) 555-0128',spent: '--',status: '--' },
    { id: '20', name: 'Mohamede MonGe',email: 'monge7@mail.com', role: 'Customers', registered: 'September 21, 2013',address:'--', phonenumber: '(966) 555-0128',spent: '--',status: '--' },
    { id: '20', name: 'Mohamede MonGe',email: 'monge7@mail.com', role: 'Customers', registered: 'September 21, 2013',address:'--', phonenumber: '(966) 555-0128',spent: '--',status: '--' },
    { id: '20', name: 'Mohamede MonGe',email: 'monge7@mail.com', role: 'Customers', registered: 'September 21, 2013',address:'--', phonenumber: '(966) 555-0128',spent: '--',status: '--' },
    { id: '20', name: 'Mohamede MonGe',email: 'monge7@mail.com', role: 'Customers', registered: 'September 21, 2013',address:'--', phonenumber: '(966) 555-0128',spent: '--',status: '--' },
    { id: '20', name: 'Mohamede MonGe',email: 'monge7@mail.com', role: 'Customers', registered: 'September 21, 2013',address:'--', phonenumber: '(966) 555-0128',spent: '--',status: '--' },
    { id: '20', name: 'Mohamede MonGe',email: 'monge7@mail.com', role: 'Customers', registered: 'September 21, 2013',address:'--', phonenumber: '(966) 555-0128',spent: '--',status: '--' },
    { id: '20', name: 'Mohamede MonGe',email: 'monge7@mail.com', role: 'Customers', registered: 'September 21, 2013',address:'--', phonenumber: '(966) 555-0128',spent: '--',status: '--' },
    { id: '20', name: 'Mohamede MonGe',email: 'monge7@mail.com', role: 'Customers', registered: 'September 21, 2013',address:'--', phonenumber: '(966) 555-0128',spent: '--',status: '--' },
    { id: '20', name: 'Mohamede MonGe',email: 'monge7@mail.com', role: 'Customers', registered: 'September 21, 2013',address:'--', phonenumber: '(966) 555-0128',spent: '--',status: '--' },
  ];
  currentPage: number = 1;
  itemsPerPage: number = 4;
  Math = Math;

 
  get paginatedUsers() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.users.slice(start, end);
  }

  setPage(page: number, event: Event) {
    event.preventDefault();
    this.currentPage = page;
  }

  getPagination(): number[] {
    const totalPages = Math.ceil(this.users.length / this.itemsPerPage);
    const maxVisiblePages = 4;
    const pagination: number[] = [];

    if (totalPages <= maxVisiblePages + 1) {
      for (let i = 1; i <= totalPages; i++) {
        pagination.push(i);
      }
    } else {
      if (this.currentPage <= 3) {
        for (let i = 1; i <= Math.min(maxVisiblePages, totalPages); i++) {
          pagination.push(i);
        }
        if (totalPages > maxVisiblePages) {
          pagination.push(-1);
          pagination.push(totalPages);
        }
      } else if (this.currentPage > totalPages - 3) {
        pagination.push(1);
        pagination.push(-1);
        for (let i = totalPages - maxVisiblePages + 1; i <= totalPages; i++) {
          pagination.push(i);
        }
      } else {
        pagination.push(1);
        pagination.push(-1);
        pagination.push(this.currentPage - 1);
        pagination.push(this.currentPage);
        pagination.push(this.currentPage + 1);
        pagination.push(-1);
        pagination.push(totalPages);
      }
    }
    return pagination;
  }

}
