import { Component, Input, SimpleChanges } from '@angular/core';
import { ChatRoom } from '../../conversation/models/conversation-table.model';
import { Message } from '../../conversation/models/message.model';
import { ConversationService } from 'src/app/shared/service/conversation.service';
import { AdminChatMessage } from '../models/admin-chat-message.model';

@Component({
  selector: 'app-chat-msg',
  templateUrl: './chat-msg.component.html',
  styleUrls: ['./chat-msg.component.css']
})
export class ChatMsgComponent {

  @Input() chatRoom!: ChatRoom;
  @Input() messages!: Message[];
  message: string = '';
  fileToBeUploaded!: File|null;
  filePreview!: (string | ArrayBuffer | null);

  maxFileSize = 25 * 1024 * 1024;

  constructor(private conversationService: ConversationService) { }

  ngOnInit(): void {

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

  imagePreview(file: File){
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target && e.target.result) {
        this.filePreview= e.target.result as string;
      }
    };
    reader.readAsDataURL(file);
  }


  sendMessage(): void {
    if (this.message.trim() || this.fileToBeUploaded) {
      this.prepareMessageFormData();
    } else {
      alert('Please select at least one user and enter a message.');
    }
  }

  prepareMessageFormData() {
    const formData = new FormData();
    // if (this.message != '') {
      const adminMessage = new AdminChatMessage({
        recipientEmail: [this.chatRoom.customerProfile.email],
        messageTitle: '',
        content: this.fileToBeUploaded?'image': this.message,
        messageType: this.fileToBeUploaded?'image':'text',
      });
      formData.append(
        'chatMessageDto',
        new Blob([JSON.stringify(adminMessage)], { type: 'application/json' })
      );
    // }

    if (this.fileToBeUploaded) {
      formData.append(`message-file`, this.fileToBeUploaded, this.fileToBeUploaded.name);
    }

    this.send(formData)
  }


  send(formData: FormData) {
    this.addToMessages();
    this.conversationService.sendMessageToAll(formData).subscribe({
      next: (n) => {
        console.log(n);
      },
      error: (e) => {
        console.log(e);
      }
    })

  }

  addToMessages() {
    const newMessage: Message = {
      id: '12345',
      senderEmail: 'sender@example.com',
      latitude: 37.7749,
      longitude: -122.4194,
      recipientEmail: 'recipient@example.com',
      messageType: this.message === ''? 'image' :'text',
      content: this.message === ''? this.filePreview :this.message,
      sentTime: null,
    };
    this.messages.push(newMessage);
    this.message='';
    this.filePreview = null;
    this.fileToBeUploaded = null;
  }
}
