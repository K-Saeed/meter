import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-settings-edit',
  templateUrl: './settings-edit.component.html',
  styleUrls: ['./settings-edit.component.css']
})
export class SettingsEditComponent implements OnInit {
  phoneNumber: string = '+966';
  showPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;
  currentLang = this.translateService.currentLang;

  constructor(
    public translateService: TranslateService

  ) { }
  ngOnInit() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    const profilePic = document.getElementById('profilePic') as HTMLImageElement;
    const uploadText = document.querySelector('.upload-text') as HTMLHeadingElement;
    const profilePicContainer = document.querySelector('.profile-pic-container') as HTMLDivElement;

    profilePic.addEventListener('click', () => {
      fileInput.click();
    });

    fileInput.addEventListener('change', (event: Event) => {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          profilePic.src = e.target!.result as string;
          profilePic.style.width = '100%';
          profilePic.style.height = '150px';
          profilePic.style.borderRadius = '50%';
          profilePic.style.marginTop = '0.6rem';
          uploadText.style.display = 'none';
          // حذف الـ display: none; من الـ container لكي يبقى العنصر مرئي
        };
        reader.readAsDataURL(input.files[0]);
      }
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleNewPasswordVisibility() {
    this.showNewPassword = !this.showNewPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onPhoneInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.value.startsWith('+966')) {
      input.value = '+966';
    }
    if (input.value.length > 13) {
      input.value = input.value.slice(0, 13);
    }
    this.phoneNumber = input.value;
  }
}
