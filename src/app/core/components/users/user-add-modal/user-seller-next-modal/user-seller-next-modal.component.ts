import { Component } from '@angular/core';

@Component({
  selector: 'app-user-seller-next-modal',
  templateUrl: './user-seller-next-modal.component.html',
  styleUrls: ['./user-seller-next-modal.component.css']
})
export class UserSellerNextModalComponent {
  phoneNumber: string = '+966';
  showPassword = false;
  showConfirmPassword = false;



  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
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
