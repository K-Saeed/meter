import { Component, Input, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { ChatRoom, Message } from '../../new-chat/chat-classes';

@Component({
  selector: 'app-conversation-chat-modal',
  templateUrl: './conversation-chat-modal.component.html',
  styleUrls: ['./conversation-chat-modal.component.css']
})
export class ConversationChatModalComponent implements AfterViewChecked {
  @Input() chatRoom!: ChatRoom;
  @Input() messages!: Message[];

  @ViewChild('chatContainer') chatContainer!: ElementRef;

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    if (this.chatContainer) {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    }
  }

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
