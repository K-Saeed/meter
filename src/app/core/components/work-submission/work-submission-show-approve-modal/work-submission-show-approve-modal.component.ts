import { Component, Input } from '@angular/core';
import { WorkSubmisionCallService } from 'src/app/shared/service/workSubimion-call.service';

@Component({
  selector: 'app-work-submission-show-approve-modal',
  templateUrl: './work-submission-show-approve-modal.component.html',
  styleUrls: ['./work-submission-show-approve-modal.component.css']
})
export class WorkSubmissionShowApproveModalComponent {
  @Input() submission!: any;
  constructor(private workSubmissionService: WorkSubmisionCallService) {}

  approveSubmission() {
    this.workSubmissionService.updateWorkSubmissionStatus(this.submission.id, this.submission.submissionType, 'Approved').subscribe({
      next: () => {
        window.location.reload();
      },
      error: (error) => {
        console.error('Error approving submission:', error);
        alert('Error approving submission');
      }
    });
  }

  closeModal() {
    const modalElement = document.getElementById('rejectModal');
    const modalInstance = (window as any).bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide();
  }
}
