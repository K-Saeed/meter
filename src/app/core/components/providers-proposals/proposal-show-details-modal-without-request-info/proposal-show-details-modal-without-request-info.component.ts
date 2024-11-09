import { Component, Input } from '@angular/core';
import { ProposalResponse } from '../models/porposal-table.model';

@Component({
  selector: 'app-proposal-show-details-modal-without-request-info',
  templateUrl: './proposal-show-details-modal-without-request-info.component.html',
  styleUrls: ['./proposal-show-details-modal-without-request-info.component.css']
})
export class ProposalShowDetailsModalWithoutRequestInfoComponent {
  @Input() proposal?: ProposalResponse;

}
