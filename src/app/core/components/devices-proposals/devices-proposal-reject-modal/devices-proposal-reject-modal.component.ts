import { Component, Input } from '@angular/core';
import { ProposalCallService } from 'src/app/shared/service/proposal-call.service';
import { DevicesProposalResponse } from '../models/devices-porposal-table.model';
import { ProposalService } from '../services/porposal.service';

@Component({
  selector: 'app-devices-proposal-reject-modal',
  templateUrl: './devices-proposal-reject-modal.component.html',
  styleUrls: ['./devices-proposal-reject-modal.component.css']
})
export class DevicesProposalRejectModalComponent {
  @Input() proposal?: DevicesProposalResponse;
  message!: string;
  status: string = 'Rejected';

  constructor(private proposalCallService: ProposalService) {}

  ngOnInit(): void {}
  updateStatus() {
    if (!this.proposal?.id) {
      this.message = "Proposal ID is required";
      return;
    }
    // this.proposalCallService.updatProposalStatus(this.proposal.id, this.status).subscribe(
    //   () => {
    //     this.message = "Status updated successfully";
    //     window.location.reload();
    //   },
    //   (error) => {
    //     this.message = "Error updating status";
    //     window.location.reload();
    //     console.error("Error:", error);
    //   }
    // );
  }
}
