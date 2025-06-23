import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/service/auth/auth.service';
import { TranslationService } from 'src/app/shared/service/translation.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  selectedOption: string = 'all';
  userProfile: any;
  imagPath:string = '';
  currentLang = 'en';

  constructor(
    private authService: AuthService,
    private router: Router,
    public translationService: TranslationService
  ){
    this.currentLang = translationService.currentLang;
  }

  ngOnInit(): void {
    const userProfileString = localStorage.getItem("user-profile");
    if (userProfileString) {
      this.userProfile = JSON.parse(userProfileString);
      this.imagPath = this.userProfile.logoPath;
      console.log(this.userProfile.logoPath)
    } else {
      this.userProfile = null;
    }
    // console.log(userProfileString);
  }
  getFirstName(): string {
    // console.log(this.userProfile?.name.split(' ')[0] || '');
    return this.userProfile?.name.split(' ')[0] || '';
  }

  onOptionChange(option: string) {
    this.selectedOption = option;
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/signin']);
  }

  switchLang(lang: string) {
    this.translationService.setLanguage(lang);
    this.currentLang = lang;
  }

  get currentFlag(): string {
    return this.currentLang === 'ar' ? 'ar.png' : 'en.png';
  }

  get currentLabel(): string {
    return this.currentLang === 'ar' ? 'Arabic' : 'English';
  }

}
