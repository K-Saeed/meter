import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { tap } from "rxjs/operators";
import { UserRquestCallService } from "src/app/shared/service/userRequest-call.service";
import { UserTableDto } from "../../users/models/user-table.model";
import { RquestCallService } from "src/app/shared/service/request-call.service";
import { RequestResponseDto } from "../models/request-table.model";

@Injectable({
  providedIn: "root",
})
export class RequestService {
  private statusSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  public status$: Observable<string | null> = this.statusSubject.asObservable();
  private roleSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  public role$: Observable<string | null> = this.statusSubject.asObservable();
  lastStatus!: string | null;
  lastType!: string | null;
  constructor(private requsetCall: RquestCallService) {}
  private rquests?: RequestResponseDto[];
  private lastFetchTime?: number;

  retriveRequestsList(type: string | null, status: string | null): Observable<RequestResponseDto[]> {
    return this.requsetCall.getAllRequest(type, status).pipe(
      tap(
        (res) => {
          this.rquests = res;
          this.lastFetchTime = Date.now();
        },
        (err) => {
          console.log(err);
        }
      )
    );
  }

  getRequestsList(type: string, status: string): Observable<RequestResponseDto[]> {
    const oneHour = (60 * 60 * 1000)/2;
    const currentTime = Date.now();

    if (!this.rquests || this.rquests.length === 0 || this.lastType != status || this.lastStatus != status || (this.lastFetchTime && (currentTime - this.lastFetchTime) > oneHour)) {
      this.lastStatus = status;
      this.lastType = type;
      return this.retriveRequestsList(this.roleSubject.value, this.statusSubject.value);
    } else {
      return of(this.rquests);
    }
  }

  // private stripTime(date: Date): Date {
  //   return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  // }

  setStatus(status: string | null): void {
    this.statusSubject.next(status);
  }

  getStatus(): string | null {
    return this.statusSubject.value;
  }

  // onDeleteProduct(productId: number | undefined): void {
  //   this.requestCall.deleteProduct(productId).subscribe(
  //     () => {
  //       console.log('Product deleted successfully');
  //     },
  //     error => {
  //       console.error('Error deleting product', error);
  //     }
  //   );
  // }
}
