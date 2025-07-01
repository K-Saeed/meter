import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-notifications-filter-modal',
  templateUrl: './notifications-filter-modal.component.html',
  styleUrls: ['./notifications-filter-modal.component.css']
})
export class NotificationsFilterModalComponent {
  activeLinks: string[] = [];
  constructor(
    public translateService: TranslateService
  ) { }
  toggleLink(link: string, event: Event): void {
    event.preventDefault();
    if (this.activeLinks.includes(link)) {
      this.activeLinks = this.activeLinks.filter(l => l !== link);
    } else {
      this.activeLinks.push(link);
    }
  }

  clearLink(link: string, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.activeLinks = this.activeLinks.filter(l => l !== link);
  }

  isActiveLink(link: string): boolean {
    return this.activeLinks.includes(link);
  }
}
