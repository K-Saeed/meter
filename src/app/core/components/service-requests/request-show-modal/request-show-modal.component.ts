import { Component, Input } from '@angular/core';
import { RequestResponseDto } from '../models/request-table.model';

@Component({
  selector: 'app-request-show-modal',
  templateUrl: './request-show-modal.component.html',
  styleUrls: ['./request-show-modal.component.css']
})
export class RequestShowModalComponent {
  @Input () request?: RequestResponseDto;

  activeLink: string = 'details';

  setActiveLink(link: string, event: Event) {
    event.preventDefault();
    this.activeLink = link;
  }
}
