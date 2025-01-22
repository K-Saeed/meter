import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChatRoom, Message, UserProfile } from './chat-classes';
import { FileResponse } from '../service-requests/models/file-response';
import * as CryptoJS from 'crypto-js';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketChatService {


  constructor(private http: HttpClient) { }

  get headers() {
    return new HttpHeaders({
      Authorization: this.getToken() ?? '',
      s: this.getSecretId() ??''
    });
  }

  getUserChatsByEmail() {
    return this.http.get<ChatRoom[]>(`/api/socket/chat/chats`, { headers: this.headers });
  }

  getMessagesByChatId(id: string) {
    return this.http.get<Message[]>(`/api/socket/chat/messages/${id}`, { headers: this.headers });
  }

  sendFile(formData: FormData) {
    return this.http.post<FileResponse>(`/api/socket/chat/send-file`, formData, { headers: this.headers });
  }


///////////////////////////////////////////////////////////////////////////////////////////////////////

  getAllChatsForAdmin() {
    return this.http.get<ChatRoom[]>(`/api/socket/chat/admin/all-chats`, { headers: this.headers });
  }

  getMessagesByChatIdForAdmin(id: string) {
    return this.http.get<Message[]>(`/api/socket/chat/admin/messages/${id}`, { headers: this.headers });
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////

  getToken(): string | null {
    return localStorage.getItem('JWT_Token');
  }

  getSecretId(): string | null {
    return localStorage.getItem('s');
  }

  getUserProfile(): UserProfile | null {
    const userProfileString = localStorage.getItem("user-profile");
    if (userProfileString) {
      return JSON.parse(userProfileString);
    } 
    return null;
  }

  public encrypt(data: string, key: string): string {
    const keyBytes = CryptoJS.enc.Base64.parse(key);
    const encrypted = CryptoJS.AES.encrypt(data, keyBytes, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.toString();
  }

  public decrypt(encryptedData: string, key: string): string {
    const keyBytes = CryptoJS.enc.Base64.parse(key);
    const decrypted = CryptoJS.AES.decrypt(encryptedData, keyBytes, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }

}
