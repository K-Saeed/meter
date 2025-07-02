import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TransactionResponse } from '../model/transaction.model';
import { TransactionService } from 'src/app/shared/service/transaction-call.service';
import { Subscription, switchMap } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.css']
})
export class TransactionsTableComponent implements OnInit {
  selectAll: boolean = false;
  transactions: TransactionResponse[] = [];
  transaction!: TransactionResponse;
  selectedTransactionId: string | undefined;
  transactionResponse?: TransactionResponse;
  private statusSubscription!: Subscription;
  currentLang: string = 'en';
  currentPage: number = 1;
  itemsPerPage: number = 4;
  totalPages: number = 1;
  pagination: number[] = [];
  Math = Math;

  constructor(
    private transactionService: TransactionService,
    private cdr: ChangeDetectorRef,
    private translateService: TranslateService,
    
  ) {
    this.currentLang = this.translateService.currentLang;
    this.translateService.onLangChange.subscribe((lang) => {
      this.currentLang = lang.lang;
    });
  }

  ngOnInit(): void {
    this.statusSubscription = this.transactionService.status$
      .pipe(
        switchMap((status) =>
          this.transactionService.getAllTransactionsList(status || '')
        )
      )
      .subscribe({
        next: (data) => {
          this.transactions = data;
          this.currentPage = 1;
          this.updatePagination();
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Error fetching transactions', err),
      });
  }

  downloadInvoice(requestId: string) {
    this.transactionService.getInvoiceByRequestId(requestId).subscribe({
      next: (n) => {
        if (n != null) {
          window.open(n.filePath, '_blank');
        }
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  changeSelectedItem(transaction: TransactionResponse) {
    this.transaction = transaction;
  }

  applyFilter(status: string) {
    this.transactionService.setStatus(status);
  }

  toggleAll(event: Event) {
    event.preventDefault();
    this.transactions.forEach((transaction) => (transaction.selected = this.selectAll));
  }

  checkIfAllSelected() {
    this.selectAll = this.transactions.every((transaction) => transaction.selected);
  }

  get paginatedUsers() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.transactions.slice(start, end);
  }

  setPage(page: number, event: Event) {
    event.preventDefault();
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  setTransactionId(transactionId: string | undefined) {
    this.selectedTransactionId = transactionId;
    this.setTransaction();
  }

  setTransaction() {
    this.transactionResponse = this.transactions.find(
      (transaction) => transaction.id === this.selectedTransactionId
    );
  }

  ngOnDestroy(): void {
    if (this.statusSubscription) {
      this.statusSubscription.unsubscribe();
    }
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.transactions.length / this.itemsPerPage);
    this.pagination = this.getPagination();
  }

  getPagination(): number[] {
    const totalPages = this.totalPages;
    const maxVisiblePages = 4;
    const pagination: number[] = [];

    if (totalPages <= maxVisiblePages + 1) {
      for (let i = 1; i <= totalPages; i++) {
        pagination.push(i);
      }
    } else {
      if (this.currentPage <= 3) {
        for (let i = 1; i <= Math.min(maxVisiblePages, totalPages); i++) {
          pagination.push(i);
        }
        if (totalPages > maxVisiblePages) {
          pagination.push(-1);
          pagination.push(totalPages);
        }
      } else if (this.currentPage > totalPages - 3) {
        pagination.push(1);
        pagination.push(-1);
        for (let i = totalPages - maxVisiblePages + 1; i <= totalPages; i++) {
          pagination.push(i);
        }
      } else {
        pagination.push(1);
        pagination.push(-1);
        pagination.push(this.currentPage - 1);
        pagination.push(this.currentPage);
        pagination.push(this.currentPage + 1);
        pagination.push(-1);
        pagination.push(totalPages);
      }
    }
    return pagination;
  }
}
