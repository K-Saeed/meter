import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { tap } from "rxjs/operators";
import { UserTableDto } from "../models/user-table.model";
import { UserRquestCallService } from "src/app/shared/service/userRequest-call.service";
import { SendOtp } from "../models/send-otp.model";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private statusSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  public status$: Observable<string | null> = this.statusSubject.asObservable();
  private roleSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  public role$: Observable<string | null> = this.roleSubject.asObservable();
  lastStatus!: string | null;
  lastRole!: string | null;
  private usersSubject: BehaviorSubject<UserTableDto[]> = new BehaviorSubject<UserTableDto[]>([]);
  public users$: Observable<UserTableDto[]> = this.usersSubject.asObservable();
  private lastFetchTime?: number;
  sendOtp!: SendOtp;
  constructor(private userRequest: UserRquestCallService) {}

  private retrieveUsersList(role: string | null, status: string | null): Observable<UserTableDto[]> {
    return this.userRequest.getAllUsers(role, status).pipe(
      tap(
        (res) => {
          this.usersSubject.next(res);
          this.lastFetchTime = Date.now();
        },
        (err) => {
          console.log(err);
        }
      )
    );
  }

  getUsersList(role: string | null, status: string | null): Observable<UserTableDto[]> {
    const oneHour = (60 * 60 * 1000) / 2;
    const currentTime = Date.now();

    if (!this.usersSubject.value.length || this.lastRole !== role || this.lastStatus !== status || (this.lastFetchTime && (currentTime - this.lastFetchTime) > oneHour)) {
      this.lastStatus = status;
      this.lastRole = role;
      return this.retrieveUsersList(role, status);
    } else {
      return of(this.usersSubject.value);
    }
  }

  setStatus(status: string | null): void {
    this.statusSubject.next(status);
  }

  setType(type: string | null): void {
    this.roleSubject.next(type);
  }

  getStatus(): string | null {
    return this.statusSubject.value;
  }


  verifyPhoneNumber(mobile: string): void {
    this.userRequest.sendOTP(mobile).subscribe({
      next: (response: SendOtp) => {
        this.sendOtp = response;
        console.log('OTP sent successfully:', response);
      },
      error: (err) => {
        console.error('Error sending OTP:', err);
      },
    });
  }

  addUser(formData: FormData) {
   return this.userRequest.addUser(formData);
  }
}
