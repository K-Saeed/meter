import { Component } from '@angular/core';

@Component({
  selector: 'app-user-add-modal',
  templateUrl: './user-add-modal.component.html',
  styleUrls: ['./user-add-modal.component.css']
})
export class UserAddModalComponent {
  dropdownOpen = false;
  selectedRole: string[] = [];
  phoneNumber: string = '+966';
  showPassword = false;
  showConfirmPassword = false;

  Role = [
    { name: 'Customer', selected: false },
    { name: 'Provider', selected: false },
    { name: 'Merchant', selected: false },
  ];

  selectedVisibility: string = '';

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  updateSelectedRole() {
    this.selectedRole = [this.selectedVisibility];
    this.dropdownOpen = false; 
  }

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
