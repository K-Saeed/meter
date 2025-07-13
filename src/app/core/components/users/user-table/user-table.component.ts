import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { UserService } from '../services/user.service';
import { combineLatest, Subscription } from 'rxjs';
import { UserTableDto } from '../models/user-table.model';
import { UserRquestCallService } from 'src/app/shared/service/userRequest-call.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit, OnDestroy {
  @Input() searchTerm: string = ''; // Input for search

  filteredUsers: UserTableDto[] = []; // Filtered list to display
  selectAll: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 4;
  Math = Math;
  status!: string;
  role!: string;
  userList: UserTableDto[] = [];
  private statusTypeSubscription!: Subscription;
  selectedUserId: string | undefined;
  user?: UserTableDto;
  message!: string;
  statusAction: string = 'Pending';
  currentLang: string = 'en';

  constructor(
    private userService: UserService,
    private userRquestCallService: UserRquestCallService,
    private cdr: ChangeDetectorRef,
    private translateService: TranslateService

  ) {
    this.currentLang = this.translateService.currentLang;
    this.translateService.onLangChange.subscribe((lang) => {
      this.currentLang = lang.lang;
    });
  }

  ngOnInit() {
    this.statusTypeSubscription = combineLatest([
      this.userService.status$,
      this.userService.role$
    ]).subscribe(([status, role]) => {
      this.status = status!;
      this.role = role!;
      this.getUserList();
    });
    this.setYearOptions();
    this.updateMonthlyUserCount();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['searchTerm'] && !changes['searchTerm'].firstChange) {
      this.filterUsers();
    }
  }

  ngOnDestroy(): void {
    if (this.statusTypeSubscription) {
      this.statusTypeSubscription.unsubscribe();
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
    return this.filteredUsers.slice(start, end);
  }

  setPage(page: number, event: Event) {
    event.preventDefault();
    const totalPages = Math.ceil(this.filteredUsers.length / this.itemsPerPage);
    if (page < 1 || page > totalPages) {
      return;
    }
    this.currentPage = page;
  }

  getUserList() {
    this.userService.getUsersList(this.role, this.status).subscribe(
      (res) => {
        this.userList = res;
        this.setYearOptions();         // <<-- call here, after userList is set
        this.updateMonthlyUserCount(); // <<-- call here, after years are set
        this.filterUsers();            // (if you still want filtering for the table)
        this.setPage(1, new Event(""));
        this.cdr.detectChanges();
      },
      (err) => {
        console.log(err);
      }
    );
  }
  

  filterUsers() {
    const term = this.searchTerm.toLowerCase();
    this.filteredUsers = this.userList.filter(user =>
      user.name.toLowerCase().includes(term) || // Match by name
      user.email.toLowerCase().includes(term) || // Match by email
      user.mobile.toLowerCase().includes(term) // Match by phone
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

  getPagination(): number[] {
    const totalPages = Math.ceil(this.filteredUsers.length / this.itemsPerPage);
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
  months = [
    { value: 1, name: 'January' },
    { value: 2, name: 'February' },
    { value: 3, name: 'March' },
    { value: 4, name: 'April' },
    { value: 5, name: 'May' },
    { value: 6, name: 'June' },
    { value: 7, name: 'July' },
    { value: 8, name: 'August' },
    { value: 9, name: 'September' },
    { value: 10, name: 'October' },
    { value: 11, name: 'November' },
    { value: 12, name: 'December' }
  ];
  
  years: number[] = [];
  selectedMonth: number | 'all' = 'all';
  selectedYear: number | 'all' = 'all';
  monthlyUserCount: number = 0;
  

  
  setYearOptions() {
    const yearsSet = new Set<number>();
    this.userList.forEach(user => {
      if (user.registeredDate) {
        const year = new Date(user.registeredDate).getFullYear();
        yearsSet.add(year);
      }
    });
    this.years = Array.from(yearsSet).sort((a, b) => b - a); // descending order
    // If no users, optionally add current year
    if (this.years.length === 0) {
      this.years = [new Date().getFullYear()];
    }
  }
  
  
  updateMonthlyUserCount() {
    let filtered = this.userList;
    if (this.selectedYear !== 'all') {
      filtered = filtered.filter(user => {
        if (!user.registeredDate) return false;
        return new Date(user.registeredDate).getFullYear() === +this.selectedYear;
      });
    }
    if (this.selectedMonth !== 'all') {
      filtered = filtered.filter(user => {
        if (!user.registeredDate) return false;
        return new Date(user.registeredDate).getMonth() + 1 === +this.selectedMonth;
      });
    }
    this.monthlyUserCount = filtered.length;
  }
  
}
