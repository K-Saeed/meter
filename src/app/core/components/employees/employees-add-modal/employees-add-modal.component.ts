import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Regex } from 'src/app/shared/constant/regex';
import { Employee } from '../model/employee.model';
import { EmployeeService } from 'src/app/shared/service/employee.service';
import { RoleChooseDto } from '../../role/model/role.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-employees-add-modal',
  templateUrl: './employees-add-modal.component.html',
  styleUrls: ['./employees-add-modal.component.css']
})
export class EmployeesAddModalComponent implements OnInit {
  dropdownOpen = false;
  selectedRole: string[] = [];
  showPassword = false;
  showConfirmPassword = false;
  form!: FormGroup;
  currentLang = 'en';
  submitClicked?: boolean;
  isVerified: boolean = false;
  logoImage?: File;
  roles: RoleChooseDto[] = [];
  constructor(private fb: FormBuilder, private employeeService: EmployeeService, 
    public translationService: TranslateService) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.currentLang = this.translationService.currentLang;
    this.initializeForm();
    this.employeeService.getAllRoles().subscribe(data => {
      this.roles = data;
    });
  }



  selectedVisibility: string = '';

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  updateSelectedRole(role: string) {
    this.selectedVisibility = role;
    this.dropdownOpen = false; // Close the dropdown after selecting a role
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  private initializeForm(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern(Regex.EMAIL_REGEX)]),
      countryCode: new FormControl({ value: '+966', disabled: true }, [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern(Regex.PHONE_REGEX)]),
      theTwoPasswords: new FormGroup(
        {
          password: new FormControl('', [Validators.required, Validators.pattern(Regex.PASSWORD_REGEX)]),
          confirmPassword: new FormControl('', [Validators.required]),
        },
        [EmployeesAddModalComponent.isPasswordsMatching()]
      ),
    });
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.logoImage = event.target.files[0];
    }
  }

  submit(): void {
    this.submitClicked = true;
    console.log(this.form);
    if (this.form.valid) {
      const employee = this.fillUserFormForm();
      console.log(employee)
      this.employeeService.addEmployee(employee, this.logoImage).subscribe({
        next: (n) => {
          console.log(n);
        },
        error: (e) => {
          console.log(e);
        },
        complete:()=>{
          window.location.reload();
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  fillUserFormForm(): Employee {
    const employee = new Employee();
    employee.name = this.form.get('name')?.value.trim();
    employee.email = this.form.get('email')?.value.trim().toLowerCase();
    employee.phoneNumber = this.form.get('countryCode')?.value + this.form.get('phoneNumber')?.value;
    employee.password = this.form.get('theTwoPasswords.password')?.value;
    employee.roleName = this.selectedVisibility;
    return employee;
  }

  handleVerificationCompleted(isVerified: boolean) {
    this.isVerified = isVerified;
  }

  static isPasswordsMatching(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password')?.value;
      const confirmPassword = control.get('confirmPassword')?.value;

      if (password !== confirmPassword) {
        return { isPasswordsMatching: true };
      }
      return null;
    };
  }
}
