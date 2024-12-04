import { Component } from '@angular/core';
import { UserRquestCallService } from 'src/app/shared/service/userRequest-call.service';
import { DraftUserDto } from '../../models/draft-user.model';

@Component({
  selector: 'app-user-unfinished-table',
  templateUrl: './user-unfinished-table.component.html',
  styleUrls: ['./user-unfinished-table.component.css']
})
export class UserUnfinishedTableComponent {
  selectAll: boolean = false;
  users: DraftUserDto[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 4;
  Math = Math;

  constructor(private userService: UserRquestCallService) {}

  ngOnInit(): void {
    this.userService.getAllUnfinishedUsers().subscribe({
      next: (data) => this.users = data,
      error: (err) => console.error('Error fetching users:', err)
    });
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
