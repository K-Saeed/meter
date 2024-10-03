import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { tap } from "rxjs/operators";
import { WorkSubmisionCallService } from "src/app/shared/service/workSubimion-call.service";
import { WorkSubmissionResponse } from "../models/work-submission-response {.model";

@Injectable({
  providedIn: "root",
})
export class WorkSubmisionService {
  private statusSubject: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);
  public status$: Observable<string | null> = this.statusSubject.asObservable();
  laststatus!: string | null;
  private workSubmissions?: WorkSubmissionResponse;
  private lastFetchTime?: number;

  constructor(private proposalCallService: WorkSubmisionCallService) {}

  retriveProductList(
    status: string | null
  ): Observable<WorkSubmissionResponse> {
    return this.proposalCallService.getAllWorkSubmission(status).pipe(
      tap(
        (res) => {
          this.workSubmissions = res;
          this.lastFetchTime = Date.now();
        },
        (err) => {
          console.log(err);
        }
      )
    );
  }

  getProposalList(status: string): Observable<WorkSubmissionResponse> {
    const oneHour = (60 * 60 * 1000) / 2;
    const currentTime = Date.now();

    if (
      !this.workSubmissions ||
      this.laststatus != status ||
      (this.lastFetchTime && currentTime - this.lastFetchTime > oneHour)
    ) {
      this.laststatus = status;
      return this.retriveProductList(this.statusSubject.value);
    } else {
      return of(this.workSubmissions);
    }
  }

  setStatus(status: string | null): void {
    this.statusSubject.next(status);
  }

  getStatus(): string | null {
    return this.statusSubject.value;
  }



}
