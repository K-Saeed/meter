import { Component } from '@angular/core';
import { TranslationService } from 'src/app/shared/service/translation.service';

@Component({
  selector: 'app-user-unfinished-action',
  templateUrl: './user-unfinished-action.component.html',
  styleUrls: ['./user-unfinished-action.component.css']
})
export class UserUnfinishedActionComponent {
  currentLang = 'en';

  constructor(
    public translationService: TranslationService
  ) {
    this.currentLang = translationService.currentLang;
  }

}
