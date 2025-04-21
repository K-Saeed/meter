import { Component, Input } from '@angular/core';
import { ProposalCallService } from 'src/app/shared/service/proposal-call.service';
import { DevicesProposalResponse } from '../models/devices-porposal-table.model';
import { ProposalService } from '../services/porposal.service';

@Component({
  selector: 'app-devices-proposal-delete-modal',
  templateUrl: './devices-proposal-delete-modal.component.html',
  styleUrls: ['./devices-proposal-delete-modal.component.css']
})
export class DevicesDevicesProposalDeleteModalComponent {
  @Input() proposal?: DevicesProposalResponse;

  constructor(private proposalCallService: ProposalService) {}

  deleteRequest(proposalId: string | undefined): void {
  //   if (proposalId !== undefined) {
  //     if (proposalId) {
  //       this.proposalCallService.deleteProposal(proposalId).subscribe(
  //         () => {
  //           window.location.reload();
  //           console.log('Request deleted successfully');
  //         },
  //         error => {
  //           console.error('Error deleting request', error);
  //         }
  //       );
  //     } else {
  //       console.error('Request ID is not a valid number');
  //     }
  //   } else {
  //     console.error('Request ID is undefined');
  //   }
  //   window.location.reload();
  }
}
