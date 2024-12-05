import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ChatRoom } from "../models/conversation-table.model";
import { Message } from "../models/message.model";
import { ConversationService } from "src/app/shared/service/conversation.service";

@Component({
  selector: "app-conversation-table",
  templateUrl: "./conversation-table.component.html",
  styleUrls: ["./conversation-table.component.css"],
})
export class ConversationTableComponent implements OnInit, OnDestroy {
  selectAll: boolean = false;
  chatRooms!:ChatRoom[];
  currentPage: number = 1;
  itemsPerPage: number = 4;
  Math = Math;
  totalPages: number = 1;
  messages!:Message[];
  selectedChatRoom!:ChatRoom;
  private chatRoomsSubscription!: Subscription;

  constructor(private conversationService: ConversationService) {}

  ngOnInit(): void {
    this.getAllConversations();
  }

  ngOnDestroy(): void {
    if (this.chatRoomsSubscription) {
      this.chatRoomsSubscription.unsubscribe();
    }
  }

  getAllConversations() {
    this.chatRoomsSubscription = this.conversationService.getAllConversations().subscribe({
      next: (n) => {
        this.chatRooms = n;
        this.totalPages = Math.ceil(this.chatRooms.length / this.itemsPerPage);
        this.setPage(1, new Event("")); // Optionally reset to page 1
      },
      error: (e) => {
        console.log(e);
      }
    });
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
    });
  }

  get paginatedChatRooms() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.chatRooms.slice(start, end);
  }

  setPage(page: number, event: Event) {
    event.preventDefault();
    const totalPages = Math.ceil(this.chatRooms.length / this.itemsPerPage);
    if (page < 1) {
      this.currentPage = 1;
    } else if (page > totalPages) {
      this.currentPage = totalPages;
    } else {
      this.currentPage = page;
    }
  }

  getPagination(): number[] {
    const maxVisiblePages = 4;
    const pagination: number[] = [];

    if (this.totalPages <= maxVisiblePages + 1) {
      for (let i = 1; i <= this.totalPages; i++) {
        pagination.push(i);
      }
    } else {
      if (this.currentPage <= 3) {
        for (let i = 1; i <= Math.min(maxVisiblePages, this.totalPages); i++) {
          pagination.push(i);
        }
        if (this.totalPages > maxVisiblePages) {
          pagination.push(-1);
          pagination.push(this.totalPages);
        }
      } else if (this.currentPage > this.totalPages - 3) {
        pagination.push(1);
        pagination.push(-1);
        for (let i = this.totalPages - maxVisiblePages + 1; i <= this.totalPages; i++) {
          pagination.push(i);
        }
      } else {
        pagination.push(1);
        pagination.push(-1);
        pagination.push(this.currentPage - 1);
        pagination.push(this.currentPage);
        pagination.push(this.currentPage + 1);
        pagination.push(-1);
        pagination.push(this.totalPages);
      }
    }
    return pagination;
  }
}
