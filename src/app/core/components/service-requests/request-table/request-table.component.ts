import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { RequestService } from "../services/request.service";
import { combineLatest, Subscription } from "rxjs";
import { RequestResponseDto } from "../models/request-table.model";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: "app-request-table",
  templateUrl: "./request-table.component.html",
  styleUrls: ["./request-table.component.css"],
})
export class RequestTableComponent implements OnInit, OnDestroy {
  @Input() searchTerm: string = "";
  filteredRequests: RequestResponseDto[] = [];
  currentLang: string = 'en';

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
      this.requestService.status$,
      this.requestService.type$,
    ]).subscribe(([status, type]) => {
      this.status = status!;
      this.type = type!;
      this.getRequestList();
    });
    this.setYearOptions();
    this.updateMonthlyUserCount();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["searchTerm"] && !changes["searchTerm"].firstChange) {
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
    this.requests.forEach((request) => (request.selected = this.selectAll));
  }

  checkIfAllSelected() {
    this.selectAll = this.requests.every((request) => request.selected);
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
        this.setYearOptions();       
        this.updateMonthlyUserCount();
        this.cdr.detectChanges();
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  filterRequests() {
    const term = this.searchTerm.toLowerCase();
    this.filteredRequests = this.requests.filter(
      (request) =>
        request.requestId.toLowerCase().includes(term) ||
        request.requestOwner.name.toLowerCase().includes(term) ||
        request.requestOwner.mobile.toLowerCase().includes(term)
    );
    this.updatePagination();
  }

  updatePagination() {
    this.totalPages = Math.ceil(
      this.filteredRequests.length / this.itemsPerPage
    );
    this.startItemIndex = (this.currentPage - 1) * this.itemsPerPage + 1;
    this.endItemIndex = Math.min(
      this.currentPage * this.itemsPerPage,
      this.filteredRequests.length
    );
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
    this.request = this.requests.find(
      (request) => request.requestId === this.selectedRequestId
    );
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
    this.requests.forEach(request => {
      if (request.creationDate) {
        const year = new Date(request.creationDate).getFullYear();
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
    let filtered = this.requests;
    if (this.selectedYear !== 'all') {
      filtered = filtered.filter(request => {
        if (!request.creationDate) return false;
        return new Date(request.creationDate).getFullYear() === +this.selectedYear;
      });
    }
    if (this.selectedMonth !== 'all') {
      filtered = filtered.filter(request => {
        if (!request.creationDate) return false;
        return new Date(request.creationDate).getMonth() + 1 === +this.selectedMonth;
      });
    }
    this.monthlyUserCount = filtered.length;
  }
}
