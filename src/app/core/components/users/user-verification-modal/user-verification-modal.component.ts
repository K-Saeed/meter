import { Component } from '@angular/core';

@Component({
  selector: 'app-user-verification-modal',
  templateUrl: './user-verification-modal.component.html',
  styleUrls: ['./user-verification-modal.component.css']
})
export class UserVerificationModalComponent {
  code: string[] = ['', '', '', '',''];
  phoneNumber: string = '+966';

  autoTab(index: number, event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.value.length === 1 && index < this.code.length - 1) {
      const nextInput = document.querySelectorAll('.code-input')[index + 1] as HTMLInputElement;
      nextInput.focus();
    }
  }

  verifyCode() {
    // Implement verification logic here
    console.log('Verification code:', this.code.join(''));
  }

  resendCode() {
    // Implement resend code logic here
    console.log('Resending code...');
  }

}
