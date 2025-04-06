import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NotificationService } from 'src/app/shared/service/notification.service';

import { NotificationResponse } from './models/notification-response.model';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent {
  notifications: NotificationResponse[] = [];
  selectedNotification!: NotificationResponse;
  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.getAllNotifications();
  }
  getAllNotifications() {
    this.notificationService.getAllNotifications().subscribe({
      next: (n) => {
        console.log(n);

        this.notifications = n;
        console.log(this.notifications);

      },
      error: (e) => {
        console.log(e);
      }
    })
  }
  changeSelectedNotification(notification: NotificationResponse) {
    this.selectedNotification = notification;
  }
  // @Input() notification!: NotificationResponse;

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['notification']) {
  //     console.log('Notification received in modal:', this.notification);
  //   }
  // }
}
