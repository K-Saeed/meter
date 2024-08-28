import { Component, Input } from '@angular/core';
import { ProposalResponse } from '../models/porposal-table.model';

@Component({
  selector: 'app-proposal-show-details-modal',
  templateUrl: './proposal-show-details-modal.component.html',
  styleUrls: ['./proposal-show-details-modal.component.css']
})
export class ProposalShowDetailsModalComponent {
  @Input() proposal?: ProposalResponse;

}
