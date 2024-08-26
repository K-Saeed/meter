import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/service/auth/auth.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  selectedOption: string = 'all';
  userProfile: any;
  constructor(
    private authService: AuthService,
    private router: Router,

  ){}

  ngOnInit(): void {
    const userProfileString = localStorage.getItem("user-profile");
    if (userProfileString) {
      this.userProfile = JSON.parse(userProfileString);
      
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



}
