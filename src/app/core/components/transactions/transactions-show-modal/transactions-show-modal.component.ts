import { Component, Input } from '@angular/core';
import { TransactionResponse } from '../model/transaction.model';

@Component({
  selector: 'app-transactions-show-modal',
  templateUrl: './transactions-show-modal.component.html',
  styleUrls: ['./transactions-show-modal.component.css']
})
export class TransactionsShowModalComponent {
  @Input () transaction?: TransactionResponse;

  activeLink: string = 'details';

  setActiveLink(link: string, event: Event) {
    event.preventDefault();
    this.activeLink = link;
  }
}
