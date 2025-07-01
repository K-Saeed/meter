import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class TranslationService {
  constructor(private translate: TranslateService) {
    translate.addLangs(['en', 'ar']);
    translate.setDefaultLang('en');

    const savedLang = localStorage.getItem('app_language');
    const browserLang = translate.getBrowserLang();
    const lang =
      savedLang && ['en', 'ar'].includes(savedLang)
        ? savedLang
        : browserLang && ['en', 'ar'].includes(browserLang)
          ? browserLang
          : 'en';

    this.setLanguage(lang);
  }

  setLanguage(lang: string) {
    this.translate.use(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('app_language', lang); // localStorage
  }

  get currentLang(): string {
    return localStorage.getItem('app_language') || 'ar';
  }
}
