import { Component, Input } from '@angular/core';
import { ProposalResponse } from '../models/porposal-table.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-proposal-show-modal',
  templateUrl: './proposal-show-modal.component.html',
  styleUrls: ['./proposal-show-modal.component.css']
})
export class ProposalShowModalComponent {


  activeLink: string = 'details';
  @Input() proposal?: ProposalResponse;

  constructor(
    public translateService: TranslateService

  ) { }

  ngOnInit(): void {

  }

  setActiveLink(link: string, event: Event) {
    event.preventDefault();
    this.activeLink = link;
  }
}
