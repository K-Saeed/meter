import { Component, Input } from '@angular/core';
import { DevicesProposalResponse } from '../models/devices-porposal-table.model';
import { DevicesProposalService } from '../services/devices-porposal.service';

@Component({
  selector: 'app-devices-proposal-reject-modal',
  templateUrl: './devices-proposal-reject-modal.component.html',
  styleUrls: ['./devices-proposal-reject-modal.component.css']
})
export class DevicesProposalRejectModalComponent {
  @Input() proposal?: DevicesProposalResponse;
  message!: string;
  status: string = 'Rejected';

  constructor(private proposalCallService: DevicesProposalService) {}

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
