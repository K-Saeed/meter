import { Component } from '@angular/core';

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
}
