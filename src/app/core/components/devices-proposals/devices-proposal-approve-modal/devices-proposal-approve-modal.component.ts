import { Component, Input } from '@angular/core';
import { ProposalCallService } from 'src/app/shared/service/proposal-call.service';
import { DevicesProposalResponse } from '../models/devices-porposal-table.model';

@Component({
  selector: 'app-devices-proposal-approve-modal',
  templateUrl: './devices-proposal-approve-modal.component.html',
  styleUrls: ['./devices-proposal-approve-modal.component.css']
})
export class DevicesProposalApproveModalComponent {
  @Input() proposal?: DevicesProposalResponse;
  message!: string;
  status: string = 'Approved';

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
