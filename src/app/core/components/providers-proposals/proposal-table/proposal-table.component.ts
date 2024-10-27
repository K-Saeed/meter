import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProposalResponse } from '../models/porposal-table.model';
import { ProposalService } from '../services/porposal.service';

@Component({
  selector: 'app-proposal-table',
  templateUrl: './proposal-table.component.html',
  styleUrls: ['./proposal-table.component.css']
})
export class ProposalTableComponent implements OnInit, OnDestroy {
  selectAll: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 4;
  totalPages: number = 1;
  Math = Math;
  status!: string;
  proposalList: ProposalResponse[] = [];
  startItemIndex: number = 1;
  endItemIndex: number = this.itemsPerPage;
  private statusSubscription!: Subscription;
  selectedProposalId?: string;
  proposal?: ProposalResponse;

  constructor(
    private proposalService: ProposalService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.statusSubscription = this.proposalService.status$.subscribe((status: string | null) => {
      this.loadProposals(status);
    });
  }

  ngOnDestroy(): void {
    if (this.statusSubscription) {
      this.statusSubscription.unsubscribe();
    }
  }

  toggleAll(event: Event) {
    event.preventDefault();
    this.proposalList.forEach(proposal => proposal.selected = this.selectAll);
  }

  checkIfAllSelected() {
    this.selectAll = this.proposalList.every(proposal => proposal.selected);
  }

  toggleProposal(proposal: ProposalResponse) {
    proposal.selected = !proposal.selected;
    this.checkIfAllSelected();
  }

  get paginatedProposals() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.proposalList.slice(start, end);
  }

  setPage(page: number, event: Event) {
    event.preventDefault();
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    this.updatePagination();
  }
  loadProposals(status: string | null) {
    this.proposalService.getProposals(status).subscribe(
      (res: ProposalResponse[]) => {
        this.proposalList = res;
        this.updatePagination();
        this.cdr.detectChanges();
      },
      (err: any) => {
        console.error("Error fetching proposals:", err);
      }
    );
  }


  updatePagination() {
    this.totalPages = Math.ceil(this.proposalList.length / this.itemsPerPage);
    this.startItemIndex = (this.currentPage - 1) * this.itemsPerPage + 1;
    this.endItemIndex = Math.min(this.currentPage * this.itemsPerPage, this.proposalList.length);
  }

  setProposalId(proposalId: string | undefined) {
    this.selectedProposalId = proposalId;
    this.setProposal();
  }

  setProposal() {
    this.proposal = this.proposalList.find(proposal => proposal.id === this.selectedProposalId);
  }

  getPagination(): number[] {
    const maxVisiblePages = 4;
    const pagination: number[] = [];
    const totalPages = this.totalPages;

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
          pagination.push(-1); // Ellipsis
          pagination.push(totalPages);
        }
      } else if (this.currentPage > totalPages - 3) {
        pagination.push(1);
        pagination.push(-1); // Ellipsis
        for (let i = totalPages - maxVisiblePages + 1; i <= totalPages; i++) {
          pagination.push(i);
        }
      } else {
        pagination.push(1);
        pagination.push(-1); // Ellipsis
        pagination.push(this.currentPage - 1);
        pagination.push(this.currentPage);
        pagination.push(this.currentPage + 1);
        pagination.push(-1); // Ellipsis
        pagination.push(totalPages);
      }
    }
    return pagination;
  }
}
