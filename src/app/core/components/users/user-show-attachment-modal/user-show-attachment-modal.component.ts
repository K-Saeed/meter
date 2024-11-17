import { Component, Input } from '@angular/core';
import { UserTableDto } from '../models/user-table.model';

@Component({
  selector: 'app-user-show-attachment-modal',
  templateUrl: './user-show-attachment-modal.component.html',
  styleUrls: ['./user-show-attachment-modal.component.css']
})
// implements OnInit()
export class UserShowAttachmentModalComponent {
  @Input() user?: UserTableDto;

}
