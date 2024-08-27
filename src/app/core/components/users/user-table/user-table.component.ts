import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';
import { UserTableDto } from '../models/user-table.model';
import { UserRquestCallService } from 'src/app/shared/service/userRequest-call.service';
@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit, OnDestroy {
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
  message!: string;
  statusAction: string = 'Pending';

  constructor(
    private userService: UserService,
    private userRquestCallService: UserRquestCallService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.statusSubscription = this.userService.status$.subscribe(status => {
      this.status = status!;
      this.getUserList();
    });

    this.roleSubscription = this.userService.role$.subscribe(role => {
      this.role = role!;
      this.getUserList();
    });

    this.getUserList();
  }

  ngOnDestroy(): void {
    if (this.statusSubscription) {
      this.statusSubscription.unsubscribe();
    }
    if (this.roleSubscription) {
      this.roleSubscription.unsubscribe();
    }
  }

  toggleAll() {
    this.userList.forEach(user => user.selected = this.selectAll);
  }

  checkIfAllSelected() {
    this.selectAll = this.userList.every(user => user.selected);
  }

  toggleUser(user: UserTableDto) {
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
      return;
    }
    this.currentPage = page;
  }

  getUserList() {
    this.userService.getUsersList(this.role, this.status).subscribe(
      (res) => {
        this.userList = res;
        this.setPage(1, new Event(""));
        this.cdr.detectChanges(); // Manually trigger change detection
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

  updateStatus(userId: string | null): void {
    if (!userId) {
      this.message = "User ID is required";
      return;
    }
    this.userRquestCallService.updateUserStatus(userId, this.statusAction).subscribe(
      () => {
        this.message = "Status updated successfully";
        this.refreshUserList();
      },
      (error) => {
        this.message = "Error updating status";
        console.error("Error:", error);
        this.refreshUserList();
      }
    );
  }

  refreshUserList(): void {
    this.userService.getUsersList('', '').subscribe(
      (res) => {
        this.userList = res;
        this.cdr.detectChanges(); // Manually trigger change detection
      },
      (err) => {
        console.error("Error fetching users:", err);
      }
    );
  }
}
