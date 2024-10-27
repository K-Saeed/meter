import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TransactionResponse } from '../model/transaction.model';
import { TransactionService } from 'src/app/shared/service/transaction-call.service';
import { Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.css']
})
export class TransactionsTableComponent implements OnInit {
  selectAll: boolean = false;
  transactions: TransactionResponse[] = [];
  selectedTransactionId: string | undefined;
  transactionResponse?: TransactionResponse;
  private statusSubscription!: Subscription;

  currentPage: number = 1;
  itemsPerPage: number = 4;
  Math = Math;

  constructor(private transactionService: TransactionService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.statusSubscription = this.transactionService.status$
      .pipe(
        switchMap((status) => this.transactionService.getAllTransactionsList(status || ''))
      )
      .subscribe({
        next: (data) => {
          this.transactions = data;
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Error fetching transactions', err),
      });
  }

  applyFilter(status: string) {
    this.transactionService.setStatus(status);
  }

  toggleAll(event: Event) {
    event.preventDefault();
    this.transactions.forEach(transaction => transaction.selected = this.selectAll);
  }

  checkIfAllSelected() {
    this.selectAll = this.transactions.every(transaction => transaction.selected);
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
    this.setTransaction();
  }

  setTransaction() {
    this.transactionResponse = this.transactions.find(transaction => transaction.id === this.selectedTransactionId);
  }

  ngOnDestroy(): void {
    if (this.statusSubscription) {
      this.statusSubscription.unsubscribe();
    }
  }
}
