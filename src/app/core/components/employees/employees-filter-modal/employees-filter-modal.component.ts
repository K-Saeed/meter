import { Component } from '@angular/core';

@Component({
  selector: 'app-employees-filter-modal',
  templateUrl: './employees-filter-modal.component.html',
  styleUrls: ['./employees-filter-modal.component.css']
})
export class EmployeesFilterModalComponent {
  activeLinks: string[] = [];

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
