import { Component, EventEmitter, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-devices-proposal-action',
  templateUrl: './devices-proposal-action.component.html',
  styleUrls: ['./devices-proposal-action.component.css']
})
export class DevicesProposalActionComponent {
  currentLang: string = 'en';
  searchTerm: string = '';

  @Output() searchChanged: EventEmitter<string> = new EventEmitter<string>();
  constructor(private translateService: TranslateService) {
    this.currentLang = this.translateService.currentLang;
  }
  applySearch() {
    this.searchChanged.emit(this.searchTerm);
  }
}
