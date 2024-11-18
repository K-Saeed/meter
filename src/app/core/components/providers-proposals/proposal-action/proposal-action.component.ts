import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-proposal-action',
  templateUrl: './proposal-action.component.html',
  styleUrls: ['./proposal-action.component.css']
})
export class ProposalActionComponent {
  searchTerm: string = '';

  @Output() searchChanged: EventEmitter<string> = new EventEmitter<string>();

  applySearch() {
    this.searchChanged.emit(this.searchTerm);
  }
}
