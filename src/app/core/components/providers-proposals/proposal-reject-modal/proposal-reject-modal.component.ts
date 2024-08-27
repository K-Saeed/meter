import { Component, Input } from '@angular/core';
import { ProposalResponse } from '../models/porposal-table.model';
import { ProposalCallService } from 'src/app/shared/service/proposal-call.service';

@Component({
  selector: 'app-proposal-reject-modal',
  templateUrl: './proposal-reject-modal.component.html',
  styleUrls: ['./proposal-reject-modal.component.css']
})
export class ProposalRejectModalComponent {
  @Input() proposal?: ProposalResponse;
  message!: string;
  status: string = 'Rejected';

  constructor(private proposalCallService: ProposalCallService) {}

  ngOnInit(): void {}
  updateStatus() {
    if (!this.proposal?.id) {
      this.message = "Proposal ID is required";
      return;
    }
    this.proposalCallService.updatProposalStatus(this.proposal.id, this.status).subscribe(
      () => {
        this.message = "Status updated successfully";
        window.location.reload();
      },
      (error) => {
        this.message = "Error updating status";
        window.location.reload();
        console.error("Error:", error);
      }
    );
  }
}
