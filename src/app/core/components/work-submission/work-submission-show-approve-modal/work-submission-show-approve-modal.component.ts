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
  message!: string;

  approveSubmission() {
    this.workSubmissionService.updateWorkSubmissionStatus(this.submission.id, this.submission.submissionType, 'Approved').subscribe(
      () => {
        this.message = "Status updated successfully";
        window.location.reload();
      },
      (error) => {
        this.message = "Error updating status";
        window.location.reload();
        console.error("Error:", error);
      }
    );
  }

  closeModal() {
    const modalElement = document.getElementById('rejectModal');
    const modalInstance = (window as any).bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide();
  }
}
