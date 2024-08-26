import { Component } from '@angular/core';
import { RequestService } from '../services/request.service';
import { RequestResponseDto } from '../models/request-table.model';

@Component({
  selector: 'app-request-table',
  templateUrl: './request-table.component.html',
  styleUrls: ['./request-table.component.css']
})
export class RequestTableComponent {

  status!: string;
  type!: string;
  requests: RequestResponseDto[] = [];
  request?: RequestResponseDto;
  selectedRequestId: string | undefined;

  currentPage: number = 1;
  itemsPerPage: number = 4;
  totalPages: number = 1;
  startItemIndex: number = 1;
  endItemIndex: number = 4;

  constructor(private requestService: RequestService) {}

  ngOnInit(): void {
    this.getRequestList();
  }

  selectAll: boolean = false;

  toggleAll(event: Event) {
    event.preventDefault();
    this.requests.forEach(request => request.selected = this.selectAll);
  }

  checkIfAllSelected() {
    this.selectAll = this.requests.every(request => request.selected);
  }

  get paginatedRequests() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.requests.slice(start, end);
  }

  setPage(page: number, event: Event) {
    event.preventDefault();
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    this.updatePageInfo();
  }

  updatePageInfo() {
    this.totalPages = Math.ceil(this.requests.length / this.itemsPerPage);
    this.startItemIndex = (this.currentPage - 1) * this.itemsPerPage + 1;
    this.endItemIndex = Math.min(this.currentPage * this.itemsPerPage, this.requests.length);
  }

  getRequestList() {
    this.requestService.getRequestsList(this.type, this.status).subscribe(
      (res) => {
        this.requests = res;
        this.updatePageInfo();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  setRequestId(requestId: string | undefined) {
    this.selectedRequestId = requestId;
    this.setUser();
  }

  setUser() {
    this.request = this.requests.find(request => request.requestId === this.selectedRequestId);
  }
}
