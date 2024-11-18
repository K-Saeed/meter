import { Component } from '@angular/core';

@Component({
  selector: 'app-providers-proposals',
  templateUrl: './providers-proposals.component.html',
  styleUrls: ['./providers-proposals.component.css']
})
export class ProvidersProposalsComponent {
  searchTerm: string = '';

  handleSearch(term: string) {
    this.searchTerm = term;
  }
}
