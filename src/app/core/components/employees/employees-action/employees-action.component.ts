import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-employees-action',
  templateUrl: './employees-action.component.html',
  styleUrls: ['./employees-action.component.css']
})
export class EmployeesActionComponent {
  searchTerm: string = '';
  currentLang: string = 'en';

  @Output() searchChanged: EventEmitter<string> = new EventEmitter<string>();

  constructor(private translateService: TranslateService) {
    this.currentLang = this.translateService.currentLang;
  }

  // ngOnInit(): void {
  //   this.translateService.onLangChange.subscribe(lang => {
  //     this.currentLang = lang.lang;
  //   });
  // }  

  applySearch() {
    this.searchChanged.emit(this.searchTerm);
  }
}
