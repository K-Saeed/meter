import { Component, Input } from '@angular/core';
import { EmployeeResponse } from '../model/employee-response.model';
import { EmployeeService } from 'src/app/shared/service/employee.service';
import { Employee } from '../model/employee.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Regex } from 'src/app/shared/constant/regex';
import { EmployeesAddModalComponent } from '../employees-add-modal/employees-add-modal.component';
import { RoleChooseDto } from '../../role/model/role.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-employees-edit-modal',
  templateUrl: './employees-edit-modal.component.html',
  styleUrls: ['./employees-edit-modal.component.css']
})
export class EmployeesEditModalComponent {

  @Input() employee!: EmployeeResponse;
  selectedRole: string[] = [];
  form!: FormGroup;
  dropdownOpen = false;
  phoneNumber: string = '+966';
  showPassword = false;
  showConfirmPassword = false;
  submitClicked?: boolean;
  currentLang = 'en';

  selectedVisibility: string = '';
  roles: RoleChooseDto[] = [];


  constructor(private employeeService: EmployeeService,
    public translationService: TranslateService) { }


  ngOnInit(): void {
    this.currentLang = this.translationService.currentLang;
    this.employeeService.getAllRoles().subscribe(data => {
      this.roles = data;
    });
  }

  ngOnChanges(): void {
    if (this.employee) {
      this.selectedVisibility = this.employee.role
      this.initializeForm();
    }
  }
  private initializeForm(): void {

    this.form = new FormGroup({
      name: new FormControl(this.employee.name, [Validators.required]),
      email: new FormControl(this.employee.email, [Validators.required, Validators.pattern(Regex.EMAIL_REGEX)]),
      countryCode: new FormControl({ value: '+966', disabled: true }, [Validators.required]),
      phoneNumber: new FormControl(this.getPhoneNumberWithoutPrefix(this.employee.phoneNumber), [Validators.required, Validators.pattern(Regex.PHONE_REGEX)]),
      theTwoPasswords: this.getTheTwoPasswords()
    });
  }

  getTheTwoPasswords() {
    const passwordControl = new FormControl('');
    const confirmPasswordControl = new FormControl('');

    const theTwoPasswords = new FormGroup(
      {
        password: passwordControl,
        confirmPassword: confirmPasswordControl,
      },
      [EmployeesAddModalComponent.isPasswordsMatching()]
    );

    passwordControl.valueChanges.subscribe((value) => {
      if (value) {
        passwordControl.setValidators([Validators.pattern(Regex.PASSWORD_REGEX)]);
        confirmPasswordControl.setValidators([Validators.required]);
      } else {
        passwordControl.clearValidators();
        confirmPasswordControl.clearValidators();
      }

      passwordControl.updateValueAndValidity({ emitEvent: false });
      confirmPasswordControl.updateValueAndValidity({ emitEvent: false });
    });

    return theTwoPasswords;
  }

  getPhoneNumberWithoutPrefix(phoneNumber: string | undefined): string {
    if (!phoneNumber) return '';
    return phoneNumber.replace(/^(\+?966)/, '');
  }



  submit(): void {
    this.submitClicked = true;
    console.log(this.form);
    if (this.form.valid) {
      const employee = this.fillUserFormForm();
      console.log(employee)
      this.employeeService.editEmployee(employee).subscribe({
        next: (n) => {
          console.log(n);
        },
        error: (e) => {
          console.log(e);
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  fillUserFormForm(): Employee {
    const employee = new Employee();
    employee.id = this.employee.id;
    employee.name = this.form.get('name')?.value.trim();
    employee.email = this.form.get('email')?.value.trim().toLowerCase();
    employee.phoneNumber = this.form.get('countryCode')?.value + this.form.get('phoneNumber')?.value;
    employee.password = this.form.get('theTwoPasswords.password')?.value;
    employee.roleName = this.selectedVisibility;
    return employee;
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }


  updateSelectedRole(role: string) {
    this.selectedVisibility = role;
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

