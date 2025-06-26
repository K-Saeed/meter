import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { WorkSubmisionService } from '../services/workSubmisionCallService';
import { WorkSubmissionResponse } from '../models/work-submission-response {.model';
import { ConstructionSubmissionResponse } from '../models/construction-submission-responses.model';
import { ConsultationSubmissionResponse } from '../models/consultation-submission-responses.model';
import { ServiceSubmissionResponse } from '../models/service-submission-responses.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-work-submission-table',
  templateUrl: './work-submission-table.component.html',
  styleUrls: ['./work-submission-table.component.css']
})
export class WorkSubmissionTableComponent implements OnInit, OnDestroy {
  selectAll: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 4;
  totalPages: number = 1;
  startItemIndex: number = 1;
  endItemIndex: number = this.itemsPerPage;

  Math = Math;

  workSubmissions: WorkSubmissionResponse = new WorkSubmissionResponse();
  status: string = '';
  selectedProposalId?: string;

  allSubmissions: (ServiceSubmissionResponse | ConstructionSubmissionResponse | ConsultationSubmissionResponse)[] = [];
  totalEntries: number = 0;

  selectedSubmission: any;
  selectedSubmissionId!: string;
  selectedSubmissionType!: string;
  currentLang: string = 'en';

  private statusSubscription!: Subscription;

  constructor(
    private workSubmisionService: WorkSubmisionService,
    private translateService: TranslateService
  ) {
    this.currentLang = this.translateService.currentLang;
    this.translateService.onLangChange.subscribe((lang) => {
      this.currentLang = lang.lang;
    });
  }

  ngOnInit(): void {
    this.statusSubscription = this.workSubmisionService.status$.subscribe(status => {
      this.status = status!;
      this.getWorkSubmissionsList();
    });
  }

  ngOnDestroy(): void {
    if (this.statusSubscription) {
      this.statusSubscription.unsubscribe();
    }
  }

  getWorkSubmissionsList() {
    this.workSubmisionService.getProposalList(this.status).subscribe(
      (res) => {
        this.workSubmissions = res;

        this.allSubmissions = [
          ...this.workSubmissions.serviceSubmissionResponses,
          ...this.workSubmissions.constructionSubmissionResponses,
          ...this.workSubmissions.consultationSubmissionResponses
        ];

        this.totalEntries = this.allSubmissions.length;
        this.currentPage = 1;
        this.updatePagination();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  toggleAll(event: Event) {
    event.preventDefault();
    this.selectAll = !this.selectAll;
    this.allSubmissions.forEach(submission => submission['selected'] = this.selectAll);
  }

  checkIfAllSelected() {
    this.selectAll = this.allSubmissions.every(submission => submission['selected']);
  }

  setPage(page: number, event: Event) {
    event.preventDefault();
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePagination();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.totalEntries / this.itemsPerPage);
    this.startItemIndex = (this.currentPage - 1) * this.itemsPerPage + 1;
    this.endItemIndex = Math.min(this.currentPage * this.itemsPerPage, this.totalEntries);
  }

  paginatedSubmissions() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.allSubmissions.slice(start, end);
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

  setProposalId(proposalId: string | undefined) {
    this.selectedProposalId = proposalId;
  }

  openModal(submission: any) {
    this.selectedSubmission = submission;
  }

  refreshList() {
    this.getWorkSubmissionsList();
  }
}
