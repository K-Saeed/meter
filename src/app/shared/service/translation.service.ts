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
    return this.translate.currentLang;
  }

  supportedLanguages: string[] = ['en', 'ar'];


  setDefaultLanguage() {
    const currentLang = this.getCurrentLanguage();
    this.translate.setDefaultLang(currentLang)
  }
  checkLanguage(language: string) {
    if (this.supportedLanguages.includes(language)) {
      this.switchLanguage(language);
    } else {
      this.setDefaultLanguage();
    }
  }
  translateKey(key: string) {
    return this.translate.instant(key);
  }

  getTranslatedKey(key: string) {
    return this.translate.get(key);
  }

  switchLanguage(language: string) {
    localStorage.setItem('lang', language);
    return this.translate.use(language);
  }
  getCurrentLanguage() {
    const savedLang = localStorage.getItem('lang') || 'en';
    return savedLang;
  }

}
