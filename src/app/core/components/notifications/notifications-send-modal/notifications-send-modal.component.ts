import { Component } from '@angular/core';
import { NotificationService } from 'src/app/shared/service/notification.service';
import { NotificationDto } from '../models/notification.model';

@Component({
  selector: 'app-notifications-send-modal',
  templateUrl: './notifications-send-modal.component.html',
  styleUrls: ['./notifications-send-modal.component.css']
})
export class NotificationsSendModalComponent {
  dropdownOpen = false;
  selectedRecipients: string[] = [];
  recipients = [
    { name: 'All Users', selected: false },
    { name: 'Providers', selected: false },
    { name: 'Customers', selected: false },
    { name: 'Sellers', selected: false }
  ];

  selectedVisibility: string = '';
  showDateInput: boolean = false;

  constructor(private notificationService: NotificationService) { }


  send(title: string, message: string) {

    if (title.length && message.length && this.selectedRecipients.length > 0) {



      const notification = new NotificationDto({
        title: title,
        content: message,
        senderEmail: this.getLoggedInUserEmail(),
        receiverEmail: this.selectedRecipients.toString(),
        status: 'sent'
      })

      this.sendNotificationToCategory(notification);

    } else {
      alert('Invalid Notification')
    }
  }

  sendNotificationToCategory(notification: NotificationDto) {
    this.notificationService.sendNotificationToCategory(notification, this.selectedRecipients).subscribe({
      next: (n) => {
        console.log(n);
      },
      error: (e) => {
        console.log(e);
      }
    })
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  updateSelectedRecipients() {
    this.selectedRecipients = this.recipients
      .filter(recipient => recipient.selected)
      .map(recipient => recipient.name);
  }

  closeDropdown(event: Event) {
    if (!(<Element>event.target).closest('.input-container')) {
      this.dropdownOpen = false;
    }
  }

  onRadioChange() {
    this.showDateInput = this.selectedVisibility === 'Scheduled';
  }


  getLoggedInUserEmail(){
    const userProfile = JSON.parse(localStorage.getItem('user-profile') || '{}');
    return userProfile.email;
  }
}
