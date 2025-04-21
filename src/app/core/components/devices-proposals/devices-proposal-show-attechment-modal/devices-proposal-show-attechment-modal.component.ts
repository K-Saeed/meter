import { Component, Input } from '@angular/core';
import { DevicesProposalResponse } from '../models/devices-porposal-table.model';

@Component({
  selector: 'app-devices-proposal-show-attechment-modal',
  templateUrl: './devices-proposal-show-attechment-modal.component.html',
  styleUrls: ['./devices-proposal-show-attechment-modal.component.css']
})
export class DevicesProposalShowAttechmentModalComponent {
  @Input() proposal?: DevicesProposalResponse;

}
