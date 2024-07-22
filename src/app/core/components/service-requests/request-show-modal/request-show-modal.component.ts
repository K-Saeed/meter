import { Component } from '@angular/core';

@Component({
  selector: 'app-request-show-modal',
  templateUrl: './request-show-modal.component.html',
  styleUrls: ['./request-show-modal.component.css']
})
export class RequestShowModalComponent {
  activeLink: string = 'details';

  setActiveLink(link: string, event: Event) {
    event.preventDefault();
    this.activeLink = link;
  }
}
