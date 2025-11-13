import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of, tap } from "rxjs";
import { TransactionResponse } from "src/app/core/components/transactions/model/transaction.model";
import { FileResponse } from "src/app/core/components/work-submission/models/file-response";

@Injectable({
  providedIn: "root",
})
export class TransactionService {
  private statusSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  public status$: Observable<string | null> = this.statusSubject.asObservable();

  private transactionsSubject: BehaviorSubject<TransactionResponse[]> = new BehaviorSubject<TransactionResponse[]>([]);
  public transactions$: Observable<TransactionResponse[]> = this.transactionsSubject.asObservable();

  private lastStatus: string | null = null;
  private lastFetchTime: number | null = null;
  private readonly cacheDuration = 10 * 60 * 1000; // 10 minutes cache duration

  constructor(private http: HttpClient) {}

  private getAllTransactions(status: string | null): Observable<TransactionResponse[]> {
    const apiUrl = "/api/admin/transaction/all";
    let params = new HttpParams();
    if (status) params = params.set("status", status);

    return this.http.get<TransactionResponse[]>(apiUrl, { params }).pipe(
      tap((res) => {
        this.transactionsSubject.next(res || []);
        this.lastStatus = status;
        this.lastFetchTime = Date.now();
      })
    );
  }

  getAllTransactionsList(status: string | null): Observable<TransactionResponse[]> {
    const currentTime = Date.now();
    if (
      this.transactionsSubject.value.length &&
      this.lastStatus === status &&
      this.lastFetchTime &&
      currentTime - this.lastFetchTime < this.cacheDuration
    ) {
      return of(this.transactionsSubject.value);
    } else {
      return this.getAllTransactions(status);
    }
  }

  setStatus(status: string | null): void {
    this.statusSubject.next(status);
  }


  updateTransactionStatus(id: string, status: string): Observable<void> {
    const apiUrl = `/api/admin/transaction/${id}/update-status`;
    const params = new HttpParams().set("status", status);

    return this.http.put<void>(apiUrl, null, { params }).pipe(
      tap(() => {
        console.log(`Transaction ${id} status updated to ${status}`);
        this.getAllTransactionsList('').subscribe();
      })
    );
  }

  

  

  getInvoiceByRequestId(requestId: string) {
    const apiUrl = `/api/request/invoice`;
    
    const params = new HttpParams()
    .set("requestId", requestId)

    return this.http.get<FileResponse>(apiUrl,{ params });

  }

  getInvoicesByDate(type:string, startDate:Date, endDate:Date){
    const apiUrl = `/api/request/invoices`;
    
    const params = new HttpParams()
    .set("type", type)
    .set("startDate",startDate.toString())
    .set("endDate",endDate.toString());

    return this.http.get<FileResponse>(apiUrl,{ params });

  }


  deleteTransactionById(transactionId: string) {
    const apiUrl = `/api/admin/transaction/${transactionId}`;

    return this.http.delete<void>(apiUrl);
  }

}
