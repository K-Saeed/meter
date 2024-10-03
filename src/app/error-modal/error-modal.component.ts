import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.css']
})
export class ErrorModalComponent {
  @Input() errorMessage!: string;
  @Input() showError!: boolean;

  closeModal() {
    this.showError = false;
  }
}
