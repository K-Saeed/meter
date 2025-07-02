import { Component } from '@angular/core';
import { ConversationService } from 'src/app/shared/service/conversation.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-conversation-action',
  templateUrl: './conversation-action.component.html',
  styleUrls: ['./conversation-action.component.css']
})
export class ConversationActionComponent {
  currentLang: string = 'en';

  constructor(private converstationService: ConversationService, private translateService: TranslateService) {
    this.currentLang = this.translateService.currentLang;
  }

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
