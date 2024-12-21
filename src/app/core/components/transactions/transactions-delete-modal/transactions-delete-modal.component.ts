import { Component, Input } from '@angular/core';
import { TransactionService } from 'src/app/shared/service/transaction-call.service';
import { TransactionResponse } from '../model/transaction.model';

@Component({
  selector: 'app-transactions-delete-modal',
  templateUrl: './transactions-delete-modal.component.html',
  styleUrls: ['./transactions-delete-modal.component.css']
})
export class TransactionsDeleteModalComponent {

  @Input() transaction!:TransactionResponse;

  constructor(private transactionService:TransactionService){}


  deleteTransactionById(){
    this.transactionService.deleteTransactionById(this.transaction.id).subscribe({
      next:(n)=>{
        this.reloadPage();
      },
      error:(e)=>{
        console.log(e);
        this.reloadPage();
      }
    })
  }
  
  reloadPage(): void {
    window.location.reload();
  }
}
