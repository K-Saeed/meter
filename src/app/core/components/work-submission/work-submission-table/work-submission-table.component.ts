import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { WorkSubmissionResponse } from '../models/work-submission-response {.model';
import { WorkSubmisionService } from '../services/workSubmisionCallService';

@Component({
  selector: 'app-work-submission-table',
  templateUrl: './work-submission-table.component.html',
  styleUrls: ['./work-submission-table.component.css']
})
export class WorkSubmissionTableComponent {
  selectAll: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 4;
  Math = Math;
  workSubmissions!: WorkSubmissionResponse;
  status!: string;
  selectedProposalId?: string;
  workSubmission?: WorkSubmissionResponse;

  private statusSubscription!: Subscription;
  selectedproposalId: string | undefined;

  constructor(private workSubmisionService: WorkSubmisionService) {}

  ngOnInit(): void {
    this.statusSubscription = this.workSubmisionService.status$.subscribe(status => {
      this.status = status!;
      this.getWorkSubmissionsList();
    });
    this.getWorkSubmissionsList();
  }

  toggleAll(event: Event) {
    event.preventDefault();
    // this.workSubmissions.forEach(workSubmission => workSubmission.selected = this.selectAll);
  }

  checkIfAllSelected() {
    // this.selectAll = this.workSubmissions.every(workSubmission => workSubmission.selected);
  }

   paginatedUsers() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    // return this.workSubmissions.slice(start, end);
  }

  setPage(page: number, event: Event) {
    event.preventDefault();
    this.currentPage = page;
  }


  getWorkSubmissionsList() {
    this.workSubmisionService.getProposalList(this.status).subscribe(
      (res) => {
        this.workSubmissions = res;
        this.setPage(1, new Event(""));
      },
      (err) => {
        console.log(err);
      }
    );
  }
  setProposalId(proposalId: string | undefined) {
    this.selectedProposalId = proposalId;
    this.setProposal();
  }


  setProposal() {
    // this.workSubmission = this.workSubmissions.find(workSubmission => workSubmission. === this.selectedProposalId);

  }
}
