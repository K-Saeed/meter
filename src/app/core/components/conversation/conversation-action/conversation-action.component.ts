import { Component } from '@angular/core';
import { ConversationService } from 'src/app/shared/service/conversation.service';

@Component({
  selector: 'app-conversation-action',
  templateUrl: './conversation-action.component.html',
  styleUrls: ['./conversation-action.component.css']
})
export class ConversationActionComponent {


  constructor(private converstationService: ConversationService) { }

  syncConversations() {
    this.converstationService.syncAllConversations().subscribe({
      next: (n) => {
        console.log(n);
      },
      error: (e) => {
        console.log(e);
      }
    })
  }

}
