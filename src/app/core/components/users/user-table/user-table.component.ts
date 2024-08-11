import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';
import { UserTableDto } from '../models/user-table.model';
@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent {
  selectAll: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 4;
  Math = Math;
  status!: string;
  role!: string;
  userList: UserTableDto[] = [];
  private statusSubscription!: Subscription;
  private roleSubscription!: Subscription;
  selectedUserId: string | undefined;
  user?: UserTableDto;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.statusSubscription = this.userService.status$.subscribe(status => {
      this.status = status!;
      this.getUserList();
    });

    this.getUserList();
  }

  toggleAll() {
    // this.userList.forEach(user => user.selected = this.selectAll);
  }

  checkIfAllSelected() {
    this.selectAll = this.userList.every(user => user.selected);
  }

  toggleUser(user:UserTableDto) {
    user.selected = !user.selected;
    this.checkIfAllSelected();
  }

  get paginatedUsers() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.userList.slice(start, end);
  }

  setPage(page: number, event: Event) {
    event.preventDefault();
    const totalPages = Math.ceil(this.userList.length / this.itemsPerPage);
    if (page < 1 || page > totalPages) {
      return; // عدم تعيين صفحة غير صالحة
    }
    this.currentPage = page;
  }
  

  getUserList() {
    this.userService.getUsersList(this.role, this.status).subscribe(
      (res) => {
        this.userList = res;
        this.setPage(1, new Event(""));
        console.log(this.userList);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  setUserId(userId: string | undefined) {
    this.selectedUserId = userId;
    this.setUser();
  }

  setUser() {
    this.user = this.userList.find(user => user.id === this.selectedUserId);

  }
}
