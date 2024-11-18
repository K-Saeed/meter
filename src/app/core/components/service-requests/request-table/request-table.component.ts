import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { RequestService } from '../services/request.service';
import { combineLatest, Subscription } from 'rxjs';
import { RequestResponseDto } from '../models/request-table.model';

@Component({
  selector: 'app-request-table',
  templateUrl: './request-table.component.html',
  styleUrls: ['./request-table.component.css']
})
export class RequestTableComponent implements OnInit, OnDestroy {
  @Input() searchTerm: string = '';
  filteredRequests: RequestResponseDto[] = [];

  selectAll: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 4;
  totalPages: number = 1;
  Math = Math;
  status!: string;
  type!: string;
  requests: RequestResponseDto[] = [];
  startItemIndex: number = 1;
  endItemIndex: number = this.itemsPerPage;
  private statusTypeSubscription!: Subscription;
  selectedRequestId: string | undefined;
  request?: RequestResponseDto;

  constructor(
    private requestService: RequestService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.statusTypeSubscription = combineLatest([
      this.requestService.status$,
      this.requestService.type$
    ]).subscribe(([status, type]) => {
      this.status = status!;
      this.type = type!;
      this.getRequestList();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['searchTerm'] && !changes['searchTerm'].firstChange) {
      this.filterRequests();
    }
  }

  ngOnDestroy(): void {
    if (this.statusTypeSubscription) {
      this.statusTypeSubscription.unsubscribe();
    }
  }

  toggleAll(event: Event) {
    event.preventDefault();
    this.requests.forEach(request => (request.selected = this.selectAll));
  }

  checkIfAllSelected() {
    this.selectAll = this.requests.every(request => request.selected);
  }

  toggleRequest(request: RequestResponseDto) {
    request.selected = !request.selected;
    this.checkIfAllSelected();
  }

  getRequestList() {
    this.requestService.getRequestsList(this.type, this.status).subscribe({
      next: (res) => {
        this.requests = res;
        this.filterRequests();
        this.updatePagination();
        this.cdr.detectChanges();
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  filterRequests() {
    const term = this.searchTerm.toLowerCase();
    this.filteredRequests = this.requests.filter((request) =>
      request.requestId.toLowerCase().includes(term)
    );
    this.updatePagination();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredRequests.length / this.itemsPerPage);
    this.startItemIndex = (this.currentPage - 1) * this.itemsPerPage + 1;
    this.endItemIndex = Math.min(this.currentPage * this.itemsPerPage, this.filteredRequests.length);
  }

  setPage(page: number, event: Event) {
    event.preventDefault();
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    this.updatePagination();
  }

  get paginatedRequests() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredRequests.slice(start, end);
  }

  setRequestId(requestId: string | undefined) {
    this.selectedRequestId = requestId;
    this.setRequest();
  }

  setRequest() {
    this.request = this.requests.find(request => request.requestId === this.selectedRequestId);
  }

  getPagination(): number[] {
    const totalPages = this.totalPages;
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
