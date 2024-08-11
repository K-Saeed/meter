import { Component, Input } from '@angular/core';
import { UserTableDto } from '../models/user-table.model';

@Component({
  selector: 'app-user-show-modal',
  templateUrl: './user-show-modal.component.html',
  styleUrls: ['./user-show-modal.component.css']
})
export class UserShowModalComponent {
  @Input () user?: UserTableDto;
  activeLink: string = 'details';

  setActiveLink(link: string, event: Event) {
    event.preventDefault();
    this.activeLink = link;
  }
}
