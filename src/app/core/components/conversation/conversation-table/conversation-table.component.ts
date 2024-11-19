import { Component } from '@angular/core';
import { ConversationService } from 'src/app/shared/service/conversation.service';
import { ChatRoom } from '../models/conversation-table.model';
import { Message } from '../models/message.model';

@Component({
  selector: 'app-conversation-table',
  templateUrl: './conversation-table.component.html',
  styleUrls: ['./conversation-table.component.css']
})
export class ConversationTableComponent {
  selectAll: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 4;
  Math = Math;


  chatRooms!:ChatRoom[];
  selectedChatRoom!:ChatRoom;
  messages!:Message[];
  constructor(private conversationService: ConversationService) { }

  ngOnInit(): void {
    // this.syncConversations()
    this.getAllConversations();
  }

  // syncConversations() {
  //   this.conversationService.syncAllConversations().subscribe({
  //     next: (n) => {
  //       // console.log(n);
  //       this.getAllConversations();
  //     },
  //     error: (e) => {
  //       console.log(e);
  //     }
  //   })
  // }

  getAllConversations(){
    this.conversationService.getAllConversations().subscribe({
      next:(n)=>{
        // console.log(n);
        this.chatRooms = n;
      },
      error:(e)=>{
        console.log(e);
      }
    })
  }

  getMessagesByChatId(chatRoom: ChatRoom){    
    this.selectedChatRoom = chatRoom;
    this.conversationService.getMessagesByChatId(chatRoom.id).subscribe({
      next:(n)=>{
        // console.log(n);
        this.messages = n;
      },
      error:(e)=>{
        console.log(e);
        
      }
    })
  }


  // toggleAll(event: Event) {
  //   event.preventDefault();
  //   this.users.forEach(user => user.selected = this.selectAll);
  // }

  // checkIfAllSelected() {
  //   this.selectAll = this.users.every(user => user.selected);
  // }

  get paginatedChatRooms() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.chatRooms.slice(start, end);
  }

  setPage(page: number, event: Event) {
    event.preventDefault();
    this.currentPage = page;
  }
}
