import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-add-modal',
  templateUrl: './user-add-modal.component.html',
  styleUrls: ['./user-add-modal.component.css']
})
export class UserAddModalComponent implements OnInit {
  dropdownOpen = false;
  phoneNumber: string = '+966';
  showPassword = false;
  showConfirmPassword = false;
  userForm!: FormGroup;
  selectedVisibility: string = '';
  isOnNextStep: boolean = false; // Tracks whether we are on the next step for providers

  Role = [
    { name: 'Customer', selected: false },
    { name: 'Provider', selected: false },
    { name: 'Merchant', selected: false },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      role: ['', Validators.required],
      name: ['', [Validators.required, Validators.minLength(3)]],
      phone: [this.phoneNumber, [Validators.required, Validators.pattern(/^\+966\d{8,9}$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  updateSelectedRole(role: string) {
    this.selectedVisibility = role;
    this.userForm.controls['role'].setValue(role);
    this.dropdownOpen = false;
  }

  goToNextStep() {
    if (this.userForm.valid) {
      this.isOnNextStep = true; // Move to the next step
    } else {
      const invalidFields = Object.keys(this.userForm.controls).filter(
        field => this.userForm.controls[field].invalid
      );
      console.log('Invalid fields:', invalidFields); // Debugging
      alert('Please fill out all required fields.');
    }
  }


  onSubmit() {
    if (this.userForm.valid) {
      console.log('Form Submitted:', this.userForm.value);
      // Add your API call here to submit the data
    } else {
      console.log('Invalid Form');
    }
  }

  passwordMatchValidator(group: FormGroup): { mismatch: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }
}
