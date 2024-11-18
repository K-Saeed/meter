import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProposalResponse } from '../models/porposal-table.model';
import { ProposalService } from '../services/porposal.service';

@Component({
  selector: 'app-proposal-table',
  templateUrl: './proposal-table.component.html',
  styleUrls: ['./proposal-table.component.css']
})
export class ProposalTableComponent implements OnInit, OnDestroy {
  @Input() searchTerm: string = ''; // Input for the request ID to search

  filteredProposals: ProposalResponse[] = []; // Store proposals filtered by requestId
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchTerm'] && !changes['searchTerm'].firstChange) {
      this.filterProposals();
    }
  }

  ngOnDestroy(): void {
    if (this.statusSubscription) {
      this.statusSubscription.unsubscribe();
    }
  }

  toggleAll(event: Event): void {
    event.preventDefault();
    this.filteredProposals.forEach(proposal => (proposal.selected = this.selectAll));
  }

  checkIfAllSelected(): void {
    this.selectAll = this.filteredProposals.every(proposal => proposal.selected);
  }

  toggleProposal(proposal: ProposalResponse): void {
    proposal.selected = !proposal.selected;
    this.checkIfAllSelected();
  }

  get paginatedProposals(): ProposalResponse[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredProposals.slice(start, end);
  }

  setPage(page: number, event: Event): void {
    event.preventDefault();
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    this.updatePagination();
  }

  loadProposals(status: string | null): void {
    this.proposalService.getProposals(status).subscribe(
      (res: ProposalResponse[]) => {
        this.proposalList = res;
        console.log('Loaded Proposals:', this.proposalList);
        this.filterProposals();
        this.updatePagination();
        this.cdr.detectChanges();
      },
      (err: any) => {
        console.error('Error fetching proposals:', err);
      }
    );
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredProposals.length / this.itemsPerPage);
    this.startItemIndex = (this.currentPage - 1) * this.itemsPerPage + 1;
    this.endItemIndex = Math.min(this.currentPage * this.itemsPerPage, this.filteredProposals.length);
  }

  setProposalId(proposalId: string | undefined): void {
    this.selectedProposalId = proposalId;
    this.setProposal();
  }

  setProposal(): void {
    this.proposal = this.filteredProposals.find(proposal => proposal.id === this.selectedProposalId);
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

  filterProposals(): void {
    const term = this.searchTerm.trim();
    console.log('Filtering proposals by requestId:', term);

    this.filteredProposals = this.proposalList.filter(proposal =>
      proposal.requestDetails?.requestId.includes(term)
    );

    console.log('Filtered Proposals:', this.filteredProposals);
    this.updatePagination();
    this.cdr.detectChanges();
  }
}
