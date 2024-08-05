import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/service/auth/auth.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent {
  selectedOption: string = 'all'; // يمكنك تعيين القيمة الافتراضية كـ 'all' أو أي قيمة تناسبك

  constructor(
    private authService: AuthService,
    private router: Router,

  ){}

  onOptionChange(option: string) {
    this.selectedOption = option;
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/signin']);
  }

}
