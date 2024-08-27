import { Component, Input } from '@angular/core';
import { ProposalResponse } from '../models/porposal-table.model';
import { ProposalCallService } from 'src/app/shared/service/proposal-call.service';

@Component({
  selector: 'app-proposal-delete-modal',
  templateUrl: './proposal-delete-modal.component.html',
  styleUrls: ['./proposal-delete-modal.component.css']
})
export class ProposalDeleteModalComponent {
  @Input() proposal?: ProposalResponse;

  constructor(private proposalCallService: ProposalCallService) {}

  deleteRequest(proposalId: string | undefined): void {
    if (proposalId !== undefined) {
      if (proposalId) {
        this.proposalCallService.deleteProposal(proposalId).subscribe(
          () => {
            window.location.reload();
            console.log('Request deleted successfully');
          },
          error => {
            console.error('Error deleting request', error);
          }
        );
      } else {
        console.error('Request ID is not a valid number');
      }
    } else {
      console.error('Request ID is undefined');
    }
  }
}
