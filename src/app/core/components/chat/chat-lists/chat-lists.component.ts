import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConversationService } from 'src/app/shared/service/conversation.service';
import { ChatRoom } from '../../conversation/models/conversation-table.model';

@Component({
  selector: 'app-chat-lists',
  templateUrl: './chat-lists.component.html',
  styleUrls: ['./chat-lists.component.css']
})
export class ChatListsComponent {
  @Input() chatRooms!: ChatRoom[];
  @Output() chatRoomSelected = new EventEmitter<ChatRoom>();
  ngOnInit() {
    console.log("hi" + this.chatRooms);
    // console.log(chatRoom?.lastMessage);
  }
  selectChatRoom(chatRoom: ChatRoom) {
    this.chatRoomSelected.emit(chatRoom);
  }
  getSafeMessage(msg: string | undefined): string {
    console.log('Message to process:', msg);
    return msg ? msg.split(' ').slice(0, 4).join(' ') : '';
    // return (msg || '').split(' ').slice(0, 5).join(' ');
  }

}
