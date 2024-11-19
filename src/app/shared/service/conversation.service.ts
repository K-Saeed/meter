import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatRoom } from 'src/app/core/components/conversation/models/conversation-table.model';
import { Message } from 'src/app/core/components/conversation/models/message.model';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(private http: HttpClient) { }


  getHeaders() {
    const headerDict = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    return {
      headers: new HttpHeaders(headerDict),
      params: {},
    };
  }


  getAllConversations(): Observable<ChatRoom[]> {
    const apiUrl = `/api/chat/all-chats`;
    return this.http.get<ChatRoom[]>(apiUrl);
  }

  syncAllConversations(): Observable<[]> {
    const apiUrl = `/api/chat/chats/update`;
    return this.http.get<[]>(apiUrl);
  }

  getMessagesByChatId(id:string): Observable<Message[]> {
    const encodedChatRoomId = encodeURIComponent(id);
    const apiUrl = `/api/chat/messages/${encodedChatRoomId}`;
    return this.http.get<Message[]>(apiUrl);
  }



}
