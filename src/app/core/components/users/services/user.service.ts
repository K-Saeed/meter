import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { last, map, tap } from "rxjs/operators";
import { RquestCallService } from "src/app/shared/service/request-call.service";
import { UserTableDto } from "../models/user-table.model";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private statusSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  public status$: Observable<string | null> = this.statusSubject.asObservable();
  private roleSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  public role$: Observable<string | null> = this.statusSubject.asObservable();
  laststatus!: string | null;
  lastrole!: string | null;
  constructor(private requestCall: RquestCallService) {}
  private users?: UserTableDto[];
  private lastFetchTime?: number;

  retriveUsersList(status: string | null, role: string | null): Observable<UserTableDto[]> {
    return this.requestCall.getAllUsers(role, status).pipe(
      tap(
        (res) => {
          this.users = res;
          this.lastFetchTime = Date.now();
        },
        (err) => {
          console.log(err);
        }
      )
    );
  }

  getUsersList(role: string, status: string): Observable<UserTableDto[]> {
    const oneHour = (60 * 60 * 1000)/2;
    const currentTime = Date.now();

    if (!this.users || this.users.length === 0 || this.lastrole != status || this.laststatus != status || (this.lastFetchTime && (currentTime - this.lastFetchTime) > oneHour)) {
      this.laststatus = status;
      this.lastrole = role;
      return this.retriveUsersList(this.roleSubject.value, this.statusSubject.value);
    } else {
      return of(this.users);
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

  onDeleteProduct(productId: number | undefined): void {
    this.requestCall.deleteProduct(productId).subscribe(
      () => {
        console.log('Product deleted successfully');
      },
      error => {
        console.error('Error deleting product', error);
      }
    );
  }
}
