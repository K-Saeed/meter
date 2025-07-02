import { Component, Input } from '@angular/core';
import { DevicesProposalResponse } from '../models/devices-porposal-table.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-devices-proposal-show-modal',
  templateUrl: './devices-proposal-show-modal.component.html',
  styleUrls: ['./devices-proposal-show-modal.component.css']
})
export class DevicesProposalShowModalComponent {


  activeLink: string = 'details';
  @Input() proposal?: DevicesProposalResponse;

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
