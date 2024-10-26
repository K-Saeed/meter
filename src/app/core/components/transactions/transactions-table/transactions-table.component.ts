import { ChangeDetectorRef, Component } from '@angular/core';
import { TransactionResponse } from '../model/transaction.model';
import { TransactionService } from 'src/app/shared/service/transaction-call.service';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.css']
})
export class TransactionsTableComponent {
  selectAll: boolean = false;
  transactions: TransactionResponse[] = [];
  selectedTransactionId: string | undefined;
  transactionResponse?: TransactionResponse;
  constructor(private transactionService: TransactionService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.fetchTransactions('');
  }

  fetchTransactions(status: string): void {
    this.transactionService.getAllTransactionsList(status)
      .subscribe({
        next: (data) => {
          this.transactions = data;
        },
        error: (err) => console.error('Error fetching transactions', err),
      });
  }

  currentPage: number = 1;
  itemsPerPage: number = 4;
  Math = Math;

  toggleAll(event: Event) {
    event.preventDefault();
    this.transactions.forEach(user => user.selected = this.selectAll);
  }

  checkIfAllSelected() {
    this.selectAll = this.transactions.every(user => user.selected);
  }

  get paginatedUsers() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.transactions.slice(start, end);
  }

  setPage(page: number, event: Event) {
    event.preventDefault();
    this.currentPage = page;
  }

  setTransactionId(transactionId: string | undefined) {
    this.selectedTransactionId = transactionId;
    this.setTransactio();
  }

  setTransactio() {
    this.transactionResponse = this.transactions.find(transaction => transaction.id === this.selectedTransactionId);
  }

  refreshUserList(): void {
    this.transactionService.getAllTransactionsList('').subscribe(
      (res) => {
        this.transactions = res;
        this.cdr.detectChanges();
      },
      (err) => {
        console.error("Error fetching users:", err);
      }
    );
  }

}
