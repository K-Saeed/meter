import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConversationService } from 'src/app/shared/service/conversation.service';
import { ChatRoom } from '../../conversation/models/conversation-table.model';

@Component({
  selector: 'app-chat-lists',
  templateUrl: './chat-lists.component.html',
  styleUrls: ['./chat-lists.component.css']
})
export class ChatListsComponent {

  @Input() chatRooms!:ChatRoom[];
  @Output() chatRoomSelected = new EventEmitter<ChatRoom>();

  selectChatRoom(chatRoom: ChatRoom) {
    this.chatRoomSelected.emit(chatRoom);
  }

}
