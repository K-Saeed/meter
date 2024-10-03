import { Component, ElementRef, Input } from '@angular/core';
import { WorkSubmisionCallService } from 'src/app/shared/service/workSubimion-call.service';

@Component({
  selector: 'app-work-submission-show-reject-modal',
  templateUrl: './work-submission-show-reject-modal.component.html',
  styleUrls: ['./work-submission-show-reject-modal.component.css']
})
export class WorkSubmissionShowRejectModalComponent {
  @Input() submission!: any;

  constructor(private workSubmissionService: WorkSubmisionCallService, private elementRef: ElementRef) {}

  rejectSubmission() {
    this.workSubmissionService.updateWorkSubmissionStatus(this.submission.id, this.submission.submissionType, 'Rejected').subscribe({
      next: () => {
        window.location.reload();
      },
      error: (error) => {
        console.error('Error rejecting submission:', error);
        alert('Error rejecting submission');
      }
    });
  }

  closeModal() {
    const modalElement = document.getElementById('rejectModal');
    const modalInstance = (window as any).bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide();
  }
}
