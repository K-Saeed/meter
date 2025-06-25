import { Component, Input } from '@angular/core';
import { NotificationResponse } from '../models/notification-response.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-notifications-show-modal',
  templateUrl: './notifications-show-modal.component.html',
  styleUrls: ['./notifications-show-modal.component.css']
})
export class NotificationsShowModalComponent {

  @Input() notification!: NotificationResponse;
  constructor(
    public translateService: TranslateService

  ) { }
}
