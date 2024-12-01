import { Component } from '@angular/core';
import { ConversationService } from 'src/app/shared/service/conversation.service';
import { ChatRoom } from '../conversation/models/conversation-table.model';
import { Message } from '../conversation/models/message.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  chatRooms!: ChatRoom[];
  selectedChatRoom!: ChatRoom;
  messages!: Message[];

  constructor(private conversationService: ConversationService) { }

  ngOnInit(): void {
    this.getAdminChats();
  }

  getAdminChats() {
    this.conversationService.getAdminChats().subscribe({
      next: (n) => {
        this.chatRooms = this.sort(n);
      },
      error: (e) => {
        console.log(e);

      }
    })
  }

  sort(n:ChatRoom[]){
   return n.sort((a, b) => {
      const aTimestamp = a.lastMessageTimestamp instanceof Date 
        ? a.lastMessageTimestamp.getTime() 
        : new Date(a.lastMessageTimestamp).getTime();
    
      const bTimestamp = b.lastMessageTimestamp instanceof Date 
        ? b.lastMessageTimestamp.getTime() 
        : new Date(b.lastMessageTimestamp).getTime();
    
      return bTimestamp - aTimestamp;
    });
  }

  onChatRoomSelected(chatRoom: ChatRoom): void {
    if (chatRoom != this.selectedChatRoom) {
      this.selectedChatRoom = chatRoom;
      this.getMessagesByChatId(chatRoom);
    }
  }

  getMessagesByChatId(chatRoom: ChatRoom) {
    this.selectedChatRoom = chatRoom;
    this.conversationService.getMessagesByChatId(chatRoom.id).subscribe({
      next: (n) => {
        this.messages = n;
      },
      error: (e) => {
        console.log(e);

      }
    })
  }
}
