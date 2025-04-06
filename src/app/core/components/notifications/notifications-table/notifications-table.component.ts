import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NotificationService } from 'src/app/shared/service/notification.service';
import { NotificationDto } from '../models/notification.model';
import { NotificationResponse } from '../models/notification-response.model';

@Component({
  selector: 'app-notifications-table',
  templateUrl: './notifications-table.component.html',
  styleUrls: ['./notifications-table.component.css']
})
export class NotificationsTableComponent {
  selectAll: boolean = false;
  users = [
    { id: '20', title: 'Service Update', message: '"New features available..."', Recipients: 'All Users', dateSent: 'September 21, 2013', typeOfService: 'Consolation', status: 'Sent', selected: false },
    { id: '20', title: 'Service Update', message: '"New features available..."', Recipients: 'Providers', dateSent: 'September 21, 2013', typeOfService: 'Service', status: 'Scheduled', selected: true },
    { id: '20', title: 'MonGe Office', message: '"New features available..."', Recipients: 'Providers', dateSent: 'September 21, 2013', typeOfService: 'Service', status: 'Scheduled', selected: true },
    { id: '20', title: 'MonGe Office', message: '"New features available..."', Recipients: 'All Users', dateSent: 'September 21, 2013', typeOfService: 'Consolation', status: 'Sent', selected: false },
    { id: '20', title: 'Service Update', message: '"New features available..."', Recipients: 'Providers', dateSent: 'September 21, 2013', typeOfService: 'Service', status: 'Scheduled', selected: true },
    { id: '20', title: 'Service Update', message: '"New features available..."', Recipients: 'Providers', dateSent: 'September 21, 2013', typeOfService: 'Service', status: 'Scheduled', selected: true },
    { id: '20', title: 'Service Update', message: '"New features available..."', Recipients: 'All Users', dateSent: 'September 21, 2013', typeOfService: 'Service', status: 'Scheduled', selected: true },
    { id: '20', title: 'Service Update', message: '"New features available..."', Recipients: 'Providers', dateSent: 'September 21, 2013', typeOfService: 'Service', status: 'Scheduled', selected: true },
    { id: '20', title: 'Service Update', message: '"New features available..."', Recipients: 'Providers', dateSent: 'September 21, 2013', typeOfService: 'Service', status: 'Scheduled', selected: true },
    { id: '20', title: 'Service Update', message: '"New features available..."', Recipients: 'Providers', dateSent: 'September 21, 2013', typeOfService: 'Service', status: 'Scheduled', selected: true },
  ];

  // notifications: NotificationResponse[] = [];
  // selectedNotification!: NotificationResponse;
  currentPage: number = 1;
  itemsPerPage: number = 4;
  Math = Math;
  @Input() notifications: NotificationResponse[] = [];
  @Output() viewNotification = new EventEmitter<NotificationResponse>();

  // constructor(private notificationService: NotificationService) { }


  // ngOnInit(): void {
  //   this.getAllNotifications();
  // }
  // getAllNotifications() {
  //   this.notificationService.getAllNotifications().subscribe({
  //     next: (n) => {
  //       console.log(n);

  //       this.notifications = n;
  //       console.log(this.notifications);

  //     },
  //     error: (e) => {
  //       console.log(e);
  //     }
  //   })
  // }
  onViewClick(notification: NotificationResponse) {
    this.viewNotification.emit(notification);
  }
  // changeSelectedNotification(notification: NotificationResponse) {
  //   this.selectedNotification = notification;
  // }

  toggleAll(event: Event) {
    // event.preventDefault();
    // this.users.forEach(user => user.selected = this.selectAll);
  }

  checkIfAllSelected() {
    // this.selectAll = this.users.every(user => user.selected);
  }

  get paginatedNotifications() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.notifications.slice(start, end);
  }

  setPage(page: number, event: Event) {
    event.preventDefault();
    this.currentPage = page;
  }
}
