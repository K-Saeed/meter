import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-provider-next-modal',
  templateUrl: './user-provider-next-modal.component.html',
  styleUrls: ['./user-provider-next-modal.component.css']
})
export class UserProviderNextModalComponent implements OnInit {
  @Input() parentForm!: FormGroup; // Receive the parent form for additional controls

  phoneNumber: string = '+966';
  showPassword = false;
  showConfirmPassword = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.parentForm.addControl('date', this.fb.control('', Validators.required));
    this.parentForm.addControl('commercialRegistration', this.fb.control('', Validators.required));
    this.parentForm.addControl('managerName', this.fb.control('', Validators.required));
    this.parentForm.addControl('region', this.fb.control('', Validators.required));
    this.parentForm.addControl('city', this.fb.control('', Validators.required));
    this.parentForm.addControl('neighborhood', this.fb.control('', Validators.required));
    this.parentForm.addControl('location', this.fb.control('', Validators.required));
    this.parentForm.addControl('uploadFile', this.fb.control('', Validators.required));
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
