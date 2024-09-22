import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WorkSubmisionService } from '../services/workSubmisionCallService';
import { WorkSubmissionResponse } from '../models/work-submission-response {.model';
import { ConstructionSubmissionResponse } from '../models/construction-submission-responses.model';
import { ConsultationSubmissionResponse } from '../models/consultation-submission-responses.model';
import { ServiceSubmissionResponse } from '../models/service-submission-responses.model';

@Component({
  selector: 'app-work-submission-table',
  templateUrl: './work-submission-table.component.html',
  styleUrls: ['./work-submission-table.component.css']
})
export class WorkSubmissionTableComponent implements OnInit {
  selectAll: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  Math = Math;
  workSubmissions: WorkSubmissionResponse = new WorkSubmissionResponse();
  status: string = '';
  selectedProposalId?: string;
  allSubmissions: (ServiceSubmissionResponse | ConstructionSubmissionResponse | ConsultationSubmissionResponse)[] = [];
  totalEntries: number = 0;

  private statusSubscription!: Subscription;

  constructor(private workSubmisionService: WorkSubmisionService) {}

  ngOnInit(): void {
    this.statusSubscription = this.workSubmisionService.status$.subscribe(status => {
      this.status = status!;
      this.getWorkSubmissionsList();
    });
    this.getWorkSubmissionsList();
  }

  getWorkSubmissionsList() {
    this.workSubmisionService.getProposalList(this.status).subscribe(
      (res) => {
        this.workSubmissions = res;

        // Combine all submission arrays into one for easy rendering and pagination
        this.allSubmissions = [
          ...this.workSubmissions.serviceSubmissionResponses,
          ...this.workSubmissions.constructionSubmissionResponses,
          ...this.workSubmissions.consultationSubmissionResponses
        ];

        // Calculate total entries
        this.totalEntries = this.allSubmissions.length;
        this.setPage(1, new Event(""));
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
    this.currentPage = page;
  }

  paginatedSubmissions() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.allSubmissions.slice(start, end);
  }

  setProposalId(proposalId: string | undefined) {
    this.selectedProposalId = proposalId;
  }
}
