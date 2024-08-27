import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProposalResponse } from '../models/porposal-table.model';
import { ProposalService } from '../services/porposal.service';

@Component({
  selector: 'app-proposal-table',
  templateUrl: './proposal-table.component.html',
  styleUrls: ['./proposal-table.component.css']
})
export class ProposalTableComponent {
  selectAll: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 4;
  Math = Math;
  proposalList: ProposalResponse[] = [];
  status!: string;
  selectedProposalId?: string;
  proposal?: ProposalResponse;

  private statusSubscription!: Subscription;
  selectedproposalId: string | undefined;

  constructor(private proposalService: ProposalService) {}

  ngOnInit(): void {
    this.statusSubscription = this.proposalService.status$.subscribe(status => {
      this.status = status!;
      this.getProposalList();
    });
    this.getProposalList();
  }

  toggleAll(event: Event) {
    event.preventDefault();
    this.proposalList.forEach(proposal => proposal.selected = this.selectAll);
  }

  checkIfAllSelected() {
    this.selectAll = this.proposalList.every(proposal => proposal.selected);
  }

  get paginatedUsers() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.proposalList.slice(start, end);
  }

  setPage(page: number, event: Event) {
    event.preventDefault();
    this.currentPage = page;
  }


  getProposalList() {
    this.proposalService.getProposalList(this.status).subscribe(
      (res) => {
        this.proposalList = res;
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
    this.proposal = this.proposalList.find(proposal => proposal.id === this.selectedProposalId);

  }
}
