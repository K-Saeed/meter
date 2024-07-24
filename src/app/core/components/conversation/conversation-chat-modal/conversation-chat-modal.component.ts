import { Component } from '@angular/core';

@Component({
  selector: 'app-conversation-chat-modal',
  templateUrl: './conversation-chat-modal.component.html',
  styleUrls: ['./conversation-chat-modal.component.css']
})
export class ConversationChatModalComponent {
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
