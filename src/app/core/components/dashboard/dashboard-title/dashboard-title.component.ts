import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/service/auth/auth.service';
import { TranslationService } from 'src/app/shared/service/translation.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard-title',
  templateUrl: './dashboard-title.component.html',
  styleUrls: ['./dashboard-title.component.css']
})
export class DashboardTitleComponent implements OnInit {
  currentLang = 'en';

  constructor(
    private authService: AuthService,
    private router: Router,
    public translationService: TranslationService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.currentLang = this.translate.currentLang;

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentLang = event.lang;
    });
  }

  get currentFlag(): string {
    return this.currentLang === 'ar' ? 'ar.png' : 'en.png';
  }

  get currentLabel(): string {
    return this.currentLang === 'ar' ? 'Arabic' : 'English';
  }
}
