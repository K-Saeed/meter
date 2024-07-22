import { Component } from '@angular/core';

@Component({
  selector: 'app-proposal-show-modal',
  templateUrl: './proposal-show-modal.component.html',
  styleUrls: ['./proposal-show-modal.component.css']
})
export class ProposalShowModalComponent {
  activeLink: string = 'details';

  setActiveLink(link: string, event: Event) {
    event.preventDefault();
    this.activeLink = link;
  }
}
