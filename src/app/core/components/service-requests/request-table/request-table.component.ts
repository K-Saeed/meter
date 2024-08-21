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

  constructor(private requestService: RequestService) {}

  ngOnInit(): void {

    this.getRequestList();
    console.log("requests: ", this.requests);
  }
  selectAll: boolean = false;


  currentPage: number = 1;
  itemsPerPage: number = 4;
  Math = Math;

  toggleAll(event: Event) {
    event.preventDefault();
    this.requests.forEach(request => request.selected = this.selectAll);
  }

  checkIfAllSelected() {
    this.selectAll = this.requests.every(request => request.selected);
  }

  get paginatedUsers() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.requests.slice(start, end);
  }

  setPage(page: number, event: Event) {
    event.preventDefault();
    this.currentPage = page;
  }

  getRequestList() {
    this.requestService.getRequestsList(this.type, this.status).subscribe(
      (res) => {
        this.requests = res;
        this.setPage(1, new Event(""));
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
