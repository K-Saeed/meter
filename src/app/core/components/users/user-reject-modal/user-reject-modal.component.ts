import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-reject-modal',
  templateUrl: './user-reject-modal.component.html',
  styleUrls: ['./user-reject-modal.component.css']
})
export class UserRejectModalComponent {
  @Input () userId?: string;


}
