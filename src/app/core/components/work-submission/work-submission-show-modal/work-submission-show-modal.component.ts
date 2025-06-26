import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-work-submission-show-modal',
  templateUrl: './work-submission-show-modal.component.html',
  styleUrls: ['./work-submission-show-modal.component.css']
})
export class WorkSubmissionShowModalComponent {
  @Input() submission: any; // Receive the submission as an input
  activeLink: string = 'details';
  selectedSubmissionId!: string;
  selectedSubmissionType!: string;
  constructor(
    public translateService: TranslateService
  ) { }
  setActiveLink(link: string, event: Event) {
    event.preventDefault();
    this.activeLink = link;
  }


  openRejectModal(submission: any) {
    this.selectedSubmissionId = submission.id;
    this.selectedSubmissionType = submission.submissionType;
    // Code to open the reject modal
  }

  openApproveModal(submission: any) {
    this.selectedSubmissionId = submission.id;
    this.selectedSubmissionType = submission.submissionType;
    // Code to open the approve modal
  }
}

