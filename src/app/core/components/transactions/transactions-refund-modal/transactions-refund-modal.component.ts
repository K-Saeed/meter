import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-transactions-refund-modal',
  templateUrl: './transactions-refund-modal.component.html',
  styleUrls: ['./transactions-refund-modal.component.css']
})
export class TransactionsRefundModalComponent {
  @Input() transactionId?: string;

}
