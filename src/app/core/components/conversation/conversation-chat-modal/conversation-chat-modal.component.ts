import { Component, Input } from '@angular/core';
import { ChatRoom } from '../models/conversation-table.model';
import { Message } from '../models/message.model';

@Component({
  selector: 'app-conversation-chat-modal',
  templateUrl: './conversation-chat-modal.component.html',
  styleUrls: ['./conversation-chat-modal.component.css']
})
export class ConversationChatModalComponent {
  @Input() chatRoom!:ChatRoom;
  @Input() messages!:Message[];

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
