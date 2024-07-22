import { Component } from '@angular/core';

@Component({
  selector: 'app-user-show-modal',
  templateUrl: './user-show-modal.component.html',
  styleUrls: ['./user-show-modal.component.css']
})
export class UserShowModalComponent {
  activeLink: string = 'details';

  setActiveLink(link: string, event: Event) {
    event.preventDefault();
    this.activeLink = link;
  }
}
