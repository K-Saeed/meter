import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  supportedLanguages: string[] = ['en', 'ar'];

  constructor(private translate: TranslateService) { }

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
