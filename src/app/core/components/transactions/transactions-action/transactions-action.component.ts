import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-transactions-action',
  templateUrl: './transactions-action.component.html',
  styleUrls: ['./transactions-action.component.css']
})
export class TransactionsActionComponent {
  currentLang: string = 'en';
  constructor(private translateService: TranslateService) {
    this.currentLang = this.translateService.currentLang;
  }
}
