import { Component } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { ChatRoom, Message, UserProfile } from '../chat-classes';
import { SocketChatService } from '../socket-chat.service';

@Component({
  selector: 'app-socket-chat',
  templateUrl: './socket-chat.component.html',
  styleUrls: ['./socket-chat.component.css']
})
export class SocketChatComponent {

  public socket!: Socket;
  key: string = '';
  public message: string = '';
  public userEmail: string = '';
  public adminEmail: string = 'support@meter.com.sa';
  public recieverEmail: string | undefined = '';
  public chatRooms: ChatRoom[] = [];
  public selectedChatRoom!: ChatRoom;
  public messages: Message[] = [];
  maxFileSize = 25 * 1024 * 1024;
  fileToBeUploaded!: File | null;
  filePreview!: (string | ArrayBuffer | null);
  secretId: string = '';
  constructor(private socketChatService: SocketChatService) {
  }

  ngOnInit(): void {

    this.secretId = this.socketChatService.getSecretId() ?? '';
    this.socket = io({
      query: {
        token: this.socketChatService.getToken(),
        s: this.secretId
      },
    });


    this.socket.on('connect', () => {
      console.log('Connected to WebSocket server');
      this.getUserChatsByEmail();
    });

    this.socket.on('receiveMessage', (data: any) => {
      try {
        const parsedData = JSON.parse(data);
        console.log('Parsed received message:', parsedData);

        if (parsedData) {
          this.handleRecievedMessage(parsedData);
        } else {
          console.error('Message format is incorrect:', parsedData);
        }
      } catch (error) {
        console.error('Error parsing received message:', error, data);
      }
    });

    this.socket.on('sendInfo', (data: any) => {
      console.log('Received info:', data);
      const parsedData = JSON.parse(data);
      this.key = parsedData;
    });

    this.userEmail = this.socketChatService.getUserProfile()?.email ?? '';
  }

  ngOnDestroy(): void {
    this.socket.disconnect()
  }

  send() {
    if (this.fileToBeUploaded && this.fileToBeUploaded !== null) {
      this.sendFile();
    } else if (this.message.trim()) {
      this.sendMessage(this.message, 'TEXT');
    }
  }

  sendMessage(content: string, contentType: string): void {
    if (content.trim()) {
      const message = new Message({
        content: content,
        contentType: contentType,
        senderEmail: this.adminEmail,
        recipientEmail: this.recieverEmail,
      });
      this.handleSendMessage(message);
      const encryptedMessage = new Message({
        content: this.socketChatService.encrypt(content, this.key),
        contentType: contentType,
        key: this.key,
        senderEmail: this.userEmail,
        recipientEmail: this.recieverEmail,
      });
      this.socket.emit('sendMessage', encryptedMessage);
      this.message = '';
    }
  }

  handleSendMessage(message: Message) {
    if (this.selectedChatRoom !== undefined) {
      if (message.contentType === 'FILE') {
        this.selectedChatRoom.lastMessage = 'file'
      } else {
        this.selectedChatRoom.lastMessage = message.content
      }
      this.messages.push(message);
      this.chatRooms = [this.selectedChatRoom, ...this.chatRooms.filter(chatRoom => (chatRoom.id) !== this.selectedChatRoom.id)];
    }
  }

  handleRecievedMessage(message: Message) {
    message.content = this.socketChatService.decrypt(message.content ?? '', message.key ?? '');
    const existingChatRoom = this.chatRooms.find(chatRoom => (chatRoom.id) === message.chatId);
    if (existingChatRoom) {
      existingChatRoom.lastMessage = message.contentType === 'TEXT' ? message.content : 'file';

      this.chatRooms = [existingChatRoom, ...this.chatRooms.filter(chatRoom => (chatRoom.id) !== message.chatId)];
      if (this.selectedChatRoom !== undefined && this.selectedChatRoom.id === message.chatId) {
        this.messages.push(message);
      }
    } else {
      const newChatRoom = new ChatRoom({
        id: message.chatId,
        lastMessage: message.contentType === 'TEXT' ? message.content : 'file',
        userProfile2: new UserProfile({
          email: message.senderEmail
        })
      });
      this.chatRooms = [newChatRoom, ...this.chatRooms];
    }
  }

  triggerFileInput() {
    const fileInput = document.getElementById('file-input') as HTMLElement;
    fileInput.click();
  }

  onFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const file = input.files[0];

      if (file.size > this.maxFileSize) {
        alert(`File ${file.name} exceeds the maximum file size of 25MB.`);
      } else {
        this.fileToBeUploaded = file;
        this.imagePreview(file);
      }
    }
  }

  imagePreview(file: File) {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target && e.target.result) {
        this.filePreview = e.target.result as string;
      }
    };
    reader.readAsDataURL(file);
  }


  getUserChatsByEmail() {
    this.socketChatService.getUserChatsByEmail().subscribe({
      next: (n) => {
        console.log(n);
        this.chatRooms = n;
      },
      error: (e) => {
        console.log(e);
      }
    })
  }

  getMessagesByChatId(chatRoom: ChatRoom) {
    this.recieverEmail = chatRoom.userProfile2?.email;
    this.socketChatService.getMessagesByChatId(chatRoom.id ?? '').subscribe({
      next: (n) => {
        console.log(n);
        this.setMessages(n);
        this.selectedChatRoom = chatRoom;
      },
      error: (e) => {
        console.log(e);
      }
    })
  }

  setMessages(messages: Message[]) {
    this.messages = [];
    messages.forEach(message => {
      message.content = this.socketChatService.decrypt(message.content ?? '', message.key ?? '');
      this.messages.push(message);
    });
  }

  sendFile() {
    if (this.fileToBeUploaded && this.fileToBeUploaded !== null) {
      const formData = new FormData();
      formData.append(`messageFile`, this.fileToBeUploaded, this.fileToBeUploaded.name);

      this.socketChatService.sendFile(formData).subscribe({
        next: (n) => {
          console.log(n);
          this.sendMessage(n.filePath, 'FILE');
          this.fileToBeUploaded = null;
        },
        error: (e) => {
          console.log(e);
        }
      })
    }
  }
}
