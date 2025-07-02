import { Component, EventEmitter, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-action',
  templateUrl: './user-action.component.html',
  styleUrls: ['./user-action.component.css']
})
export class UserActionComponent {
  searchTerm: string = '';
  currentLang: string = 'en';

  @Output() searchChanged: EventEmitter<string> = new EventEmitter<string>();
  constructor(private translateService: TranslateService) {
    this.currentLang = this.translateService.currentLang;
  }
  applySearch() {
    this.searchChanged.emit(this.searchTerm);
  }
}
