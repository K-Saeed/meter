import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { TranslationService } from 'src/app/shared/service/translation.service';

@Component({
  selector: 'app-user-unfinished-title',
  templateUrl: './user-unfinished-title.component.html',
  styleUrls: ['./user-unfinished-title.component.css']
})
export class UserUnfinishedTitleComponent implements OnInit {
  currentLang = 'en';
  constructor(
    public translationService: TranslationService,
    private translate: TranslateService
  ) { }
  ngOnInit(): void {
    this.currentLang = this.translate.currentLang;

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentLang = event.lang;
    });
  }
}
