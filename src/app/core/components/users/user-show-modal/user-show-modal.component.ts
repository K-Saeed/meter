import { Component, Input } from '@angular/core';
import { UserTableDto } from '../models/user-table.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-show-modal',
  templateUrl: './user-show-modal.component.html',
  styleUrls: ['./user-show-modal.component.css']
})
export class UserShowModalComponent {
  @Input() user?: UserTableDto;
  activeLink: string = 'details';
  constructor(
    public translateService: TranslateService
  ) { }
  setActiveLink(link: string, event: Event) {
    event.preventDefault();
    this.activeLink = link;
  }
}
