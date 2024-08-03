import { Component } from '@angular/core';

@Component({
  selector: 'app-user-seller-modal',
  templateUrl: './user-seller-modal.component.html',
  styleUrls: ['./user-seller-modal.component.css']
})
export class UserSellerModalComponent {
  dropdownOpen: 'none' | 'provider' | 'role' | 'activity' = 'none';
  phoneNumber: string = '+966';
  showPassword = false;
  showConfirmPassword = false;

  Role = [
    { name: 'Customer', selected: false },
    { name: 'Provider', selected: false },
    { name: 'Merchant', selected: false },
  ];

  Providers = [
    { name: 'Company', selected: false },
    { name: 'Establishment', selected: false },
    { name: 'Office', selected: false },
  ];

  Activity = [
    { name: 'Survey Office', selected: false },
    { name: 'Engineering Office', selected: false },
    { name: 'Design Office', selected: false },
    { name: 'Interior Design Office', selected: false },
    { name: 'Engineering consulting company', selected: false },
    { name: 'Salama Office', selected: false },
    { name: 'Other', selected: false },
  ];

  filteredProviders = [...this.Providers];

  selectedRole: string = '';
  selectedProvider: string = '';
  selectedActivity: string = '';


  toggleDropdown(type: 'provider' | 'role' | 'activity') {
    if (this.dropdownOpen === type) {
      this.dropdownOpen = 'none'; 
    } else {
      this.dropdownOpen = type; 
    }
  }

  updateSelectedRole() {
    this.selectedRole = this.selectedRole;
    this.dropdownOpen = 'none';
  }

  updateSelectedProvider() {
    this.selectedProvider = this.selectedProvider;
    this.dropdownOpen = 'none';
  }

  updateSelectedActivity() {
    this.selectedActivity = this.selectedActivity;
    this.dropdownOpen = 'none';
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
