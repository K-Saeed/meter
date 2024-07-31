import { Component } from '@angular/core';

@Component({
  selector: 'app-work-submission-show-modal',
  templateUrl: './work-submission-show-modal.component.html',
  styleUrls: ['./work-submission-show-modal.component.css']
})
export class WorkSubmissionShowModalComponent {
  activeLink: string = 'details';

  setActiveLink(link: string, event: Event) {
    event.preventDefault();
    this.activeLink = link;
  }
}
