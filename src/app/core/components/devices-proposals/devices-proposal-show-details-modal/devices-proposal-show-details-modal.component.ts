import { Component, Input } from '@angular/core';
import { DevicesProposalResponse } from '../models/devices-porposal-table.model';

@Component({
  selector: 'app-devices-proposal-show-details-modal',
  templateUrl: './devices-proposal-show-details-modal.component.html',
  styleUrls: ['./devices-proposal-show-details-modal.component.css']
})
export class DevicesProposalShowDetailsModalComponent {
  @Input() proposal?: DevicesProposalResponse;

}
