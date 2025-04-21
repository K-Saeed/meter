import { Component } from '@angular/core';

@Component({
  selector: 'app-devices-proposals',
  templateUrl: './devices-proposals.component.html',
  styleUrls: ['./devices-proposals.component.css']
})
export class DevicesProposalsComponent {
  searchTerm: string = '';

  handleSearch(term: string) {
    this.searchTerm = term;
  }
}
