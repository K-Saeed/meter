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
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  selectAll: boolean = false;
  users = [
    { name: 'Mohamede MonGe', email: 'monge7@mail.com', role: 'Customers', registered: 'September 21, 2013', address: '30 ahmed st. - makka - saudi arabia', phone: '(966) 555-0128', spent: '$7687.6', selected: false },
  ];

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
}
