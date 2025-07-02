import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { TranslationService } from 'src/app/shared/service/translation.service';

@Component({
  selector: 'app-work-submission-title',
  templateUrl: './work-submission-title.component.html',
  styleUrls: ['./work-submission-title.component.css']
})
export class WorkSubmissionTitleComponent implements OnInit {
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
  // get currentFlag(): string {
  //   return this.currentLang === 'ar' ? 'ar.png' : 'en.png';
  // }

  // get currentLabel(): string {
  //   return this.currentLang === 'ar' ? 'Arabic' : 'English';
  // }
}
