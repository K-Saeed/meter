import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-devices-proposal-action',
  templateUrl: './devices-proposal-action.component.html',
  styleUrls: ['./devices-proposal-action.component.css']
})
export class DevicesProposalActionComponent {
  searchTerm: string = '';

  @Output() searchChanged: EventEmitter<string> = new EventEmitter<string>();

  applySearch() {
    this.searchChanged.emit(this.searchTerm);
  }
}
