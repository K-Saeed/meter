import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-request-action',
  templateUrl: './request-action.component.html',
  styleUrls: ['./request-action.component.css']
})
export class RequestActionComponent implements OnInit {
  searchTerm: string = '';
  currentLang: string = 'en';

  @Output() searchChanged: EventEmitter<string> = new EventEmitter<string>();

  constructor(private translateService: TranslateService) {
    this.currentLang = this.translateService.currentLang;
  }

  ngOnInit(): void {
    this.translateService.onLangChange.subscribe(lang => {
      this.currentLang = lang.lang;
    });
  }

  applySearch() {
    this.searchChanged.emit(this.searchTerm);
  }

}
