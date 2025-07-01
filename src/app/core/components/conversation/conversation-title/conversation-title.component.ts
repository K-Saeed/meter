import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { TranslationService } from 'src/app/shared/service/translation.service';

@Component({
  selector: 'app-conversation-title',
  templateUrl: './conversation-title.component.html',
  styleUrls: ['./conversation-title.component.css']
})
export class ConversationTitleComponent implements OnInit {
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
