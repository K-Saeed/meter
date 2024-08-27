import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { tap } from "rxjs/operators";
import { RquestCallService } from "src/app/shared/service/request-call.service";
import { RequestResponseDto } from "../models/request-table.model";
import { ProposalCallService } from "src/app/shared/service/proposal-call.service";
import { ProposalResponse } from "../models/porposal-table.model";

@Injectable({
  providedIn: "root",
})
export class ProposalService {
  private statusSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  public status$: Observable<string | null> = this.statusSubject.asObservable();
  laststatus!: string | null;
  private proposals?: ProposalResponse[];
  private lastFetchTime?: number;

  constructor(private proposalCallService: ProposalCallService) {}

  retriveProductList(status: string | null): Observable<ProposalResponse[]> {
    return this.proposalCallService.getAllProposals(status).pipe(
      tap(
        (res) => {
          this.proposals = res;
          this.lastFetchTime = Date.now();
        },
        (err) => {
          console.log(err);
        }
      )
    );
  }

  getProposalList(status: string): Observable<ProposalResponse[]> {
    const oneHour = (60 * 60 * 1000)/2;
    const currentTime = Date.now();

    if (!this.proposals || this.proposals.length === 0 || this.laststatus != status || (this.lastFetchTime && (currentTime - this.lastFetchTime) > oneHour)) {
      this.laststatus = status;
      return this.retriveProductList(this.statusSubject.value);
    } else {
      return of(this.proposals);
    }
  }

  setStatus(status: string | null): void {
    this.statusSubject.next(status);
  }

  getStatus(): string | null {
    return this.statusSubject.value;
  }
}
