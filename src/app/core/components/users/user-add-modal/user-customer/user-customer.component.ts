import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-customer',
  templateUrl: './user-customer.component.html',
  styleUrls: ['./user-customer.component.css']
})
export class UserCustomerComponent {
  @Input() parentForm!: FormGroup; // To extend the parent form
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

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // Extend the parent form with customer-specific fields
    this.parentForm.addControl('address', this.fb.control('', [Validators.required, Validators.minLength(5)]));
    this.parentForm.addControl('city', this.fb.control('', Validators.required));
    this.parentForm.addControl('neighborhood', this.fb.control('', Validators.required));
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  updateSelectedRole() {
    this.selectedRole = [this.selectedVisibility];
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
