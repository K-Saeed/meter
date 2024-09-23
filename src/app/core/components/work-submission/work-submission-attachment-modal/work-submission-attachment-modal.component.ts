import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-work-submission-attachment-modal',
  templateUrl: './work-submission-attachment-modal.component.html',
  styleUrls: ['./work-submission-attachment-modal.component.css']
})
export class WorkSubmissionAttachmentModalComponent {
  @Input() submission: any; // Input to receive submission details

}
