import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-work-submission-details-modal',
  templateUrl: './work-submission-details-modal.component.html',
  styleUrls: ['./work-submission-details-modal.component.css']
})
export class WorkSubmissionDetailsModalComponent {
  @Input() submission: any; // Input to receive submission details
}
