import { Component, Input } from '@angular/core';
import { ProposalResponse } from '../models/porposal-table.model';

@Component({
  selector: 'app-proposal-show-modal',
  templateUrl: './proposal-show-modal.component.html',
  styleUrls: ['./proposal-show-modal.component.css']
})
export class ProposalShowModalComponent {


  activeLink: string = 'details';
  @Input() proposal?: ProposalResponse;

  constructor() {}

  ngOnInit(): void {

  }

  setActiveLink(link: string, event: Event) {
    event.preventDefault();
    this.activeLink = link;
  }
}
