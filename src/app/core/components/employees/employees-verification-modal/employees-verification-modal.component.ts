import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { EmployeeService } from 'src/app/shared/service/employee.service';

@Component({
  selector: 'app-employees-verification-modal',
  templateUrl: './employees-verification-modal.component.html',
  styleUrls: ['./employees-verification-modal.component.css']
})
export class EmployeesVerificationModalComponent implements OnChanges {
  @Input() phoneNumber: string = '+966';
  @Output() verificationCompleted = new EventEmitter<boolean>();
  code: string[] = ['', '', '', '', ''];
  verificationId: string = '';

  constructor(private employeeService: EmployeeService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['phoneNumber'] && this.phoneNumber) {
      this.sendOtp();
    }
  }

  autoTab(index: number, event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.value.length === 1 && index < this.code.length - 1) {
      const nextInput = document.querySelectorAll('.code-input')[index + 1] as HTMLInputElement;
      nextInput.focus();
    }
  }

  sendOtp() {
    this.employeeService.sendOtp(this.phoneNumber).subscribe(
      response => {
        console.log('OTP sent successfully', response);
        this.verificationId = response.id;
      },
      error => {
        console.error('Error sending OTP', error);
      }
    );
  }

  verifyCode() {
    const verificationCode = this.code.join('');
    this.employeeService.verifyOtp(verificationCode, this.verificationId, this.phoneNumber).subscribe(
      response => {
        console.log('Verification successful', response);
        this.verificationCompleted.emit(true);
      },
      error => {
        console.error('Verification failed', error);
        this.verificationCompleted.emit(false);
      }
    );
  }

  resendCode() {
    this.sendOtp();
  }

  getMaskedPhoneNumber(): string {
    if (this.phoneNumber.length >= 9) {
      return this.phoneNumber.slice(0, 4) + '****' + this.phoneNumber.slice(-3);
    }
    return this.phoneNumber;
  }
}
