import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of, switchMap, tap } from "rxjs";
import { TransactionResponse } from "src/app/core/components/transactions/model/transaction.model";

@Injectable({
  providedIn: "root",
})
export class TransactionService {
  private statusSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  public status$: Observable<string | null> = this.statusSubject.asObservable();

  private transactionsSubject: BehaviorSubject<TransactionResponse[]> = new BehaviorSubject<TransactionResponse[]>([]);
  public transactions$: Observable<TransactionResponse[]> = this.transactionsSubject.asObservable();

  private lastStatus!: string | null;
  private lastFetchTime?: number;

  constructor(private http: HttpClient) {
    this.status$
      .pipe(
        switchMap((status) => this.getAllTransactions(status))
      )
      .subscribe((transactions) => this.transactionsSubject.next(transactions));
  }

  getAllTransactions(status?: string | null): Observable<TransactionResponse[]> {
    const apiUrl = "/api/admin/transaction/all";
    let params = new HttpParams();
    if (status) params = params.set("status", status);

    return this.http.get<TransactionResponse[]>(apiUrl, { params }).pipe(
      tap(
        (res) => {
          this.transactionsSubject.next(res);
          this.lastFetchTime = Date.now();
        },
        (err) => {
          console.error("Error fetching transactions:", err);
        }
      )
    );
  }

  getAllTransactionsList(status: string): Observable<TransactionResponse[]> {
    const halfHour = (60 * 60 * 1000) / 2;
    const currentTime = Date.now();

    if (!this.transactionsSubject.value.length || this.lastStatus !== status || (this.lastFetchTime && (currentTime - this.lastFetchTime) > halfHour)) {
      this.lastStatus = status;
      return this.getAllTransactions(status);
    } else {
      return of(this.transactionsSubject.value);
    }
  }

  setStatus(status: string | null): void {
    this.statusSubject.next(status);
  }
}
