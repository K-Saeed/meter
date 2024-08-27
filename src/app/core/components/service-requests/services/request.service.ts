import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { tap } from "rxjs/operators";
import { RquestCallService } from "src/app/shared/service/request-call.service";
import { RequestResponseDto } from "../models/request-table.model";

@Injectable({
  providedIn: "root",
})
export class RequestService {
  private statusSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  public status$: Observable<string | null> = this.statusSubject.asObservable();
  private typeSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  public type$: Observable<string | null> = this.typeSubject.asObservable();
  private requestsSubject: BehaviorSubject<RequestResponseDto[]> = new BehaviorSubject<RequestResponseDto[]>([]);
  public requests$: Observable<RequestResponseDto[]> = this.requestsSubject.asObservable();
  private lastFetchTime?: number;
  lastStatus!: string | null;
  lastType!: string | null;

  constructor(private requestCall: RquestCallService) {}

  private retrieveRequestsList(type: string | null, status: string | null): Observable<RequestResponseDto[]> {
    return this.requestCall.getAllRequest(type, status).pipe(
      tap(
        (res) => {
          this.requestsSubject.next(res);
          this.lastFetchTime = Date.now();
        },
        (err) => {
          console.log(err);
        }
      )
    );
  }

  getRequestsList(type: string | null, status: string | null): Observable<RequestResponseDto[]> {
    const oneHour = (60 * 60 * 1000) / 2;
    const currentTime = Date.now();

    if (!this.requestsSubject.value.length || this.lastType !== type || this.lastStatus !== status || (this.lastFetchTime && (currentTime - this.lastFetchTime) > oneHour)) {
      this.lastStatus = status;
      this.lastType = type;
      return this.retrieveRequestsList(type, status);
    } else {
      return of(this.requestsSubject.value);
    }
  }

  setStatus(status: string | null): void {
    this.statusSubject.next(status);
  }

  setType(type: string | null): void {
    this.typeSubject.next(type);
  }

  getStatus(): string | null {
    return this.statusSubject.value;
  }
}
