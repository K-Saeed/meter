import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, shareReplay, tap } from 'rxjs';
import { ChatRoom } from 'src/app/core/components/conversation/models/conversation-table.model';
import { Message } from 'src/app/core/components/conversation/models/message.model';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  private chatRoomsCache: ChatRoom[] | null = null;
  private adminChatRoomsCache: ChatRoom[] | null = null;

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
    if (this.chatRoomsCache) {
      return of(this.chatRoomsCache);
    }
    return this.http.get<ChatRoom[]>(apiUrl).pipe(
      tap((chatRooms) => (this.chatRoomsCache = chatRooms)),
      shareReplay(1)
    );
  }

  syncAllConversations(): Observable<[]> {
    const apiUrl = `/api/chat/chats/update`;
    return this.http.get<[]>(apiUrl);
  }

  getMessagesByChatId(id: string): Observable<Message[]> {
    const encodedChatRoomId = encodeURIComponent(id);
    const apiUrl = `/api/chat/messages/${encodedChatRoomId}`;
    return this.http.get<Message[]>(apiUrl);
  }

  getAdminChats(): Observable<ChatRoom[]> {
    const apiUrl = `/api/admin/chat/all-chats`;
    if (this.adminChatRoomsCache) {
      return of(this.adminChatRoomsCache);
    }
    return this.http.get<ChatRoom[]>(apiUrl).pipe(
      tap((chatRooms) => (this.adminChatRoomsCache = chatRooms)),
    );
  }

  sendMessageToAll(message: FormData): Observable<[]> {
    const apiUrl = `/api/admin/chat/send/message`;
    return this.http.post<[]>(apiUrl, message);
  }


}
