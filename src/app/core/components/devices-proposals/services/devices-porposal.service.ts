import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { tap, switchMap } from "rxjs/operators";
import { DevicesProposalResponse } from "../models/devices-porposal-table.model";

@Injectable({
  providedIn: "root",
})
export class DevicesProposalService {
  private statusSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  public status$: Observable<string | null> = this.statusSubject.asObservable();

  private proposalsSubject: BehaviorSubject<DevicesProposalResponse[]> = new BehaviorSubject<DevicesProposalResponse[]>([]);
  public proposals$: Observable<DevicesProposalResponse[]> = this.proposalsSubject.asObservable();

  private lastStatus: string | null = null;
  private lastFetchTime: number | null = null;
  private readonly cacheDuration = 10 * 60 * 1000; // Cache for 10 minutes

  constructor(private http: HttpClient) {
    // Automatically fetch proposals whenever the status changes
    this.status$.pipe(
      switchMap((status) => this.getProposals(status))
    ).subscribe();
  }

  private fetchProposals(status: string | null): Observable<DevicesProposalResponse[]> {
    const apiUrl = "/api/product/admin/devices/proposals";
    let params = new HttpParams();
    if (status) params = params.set("status", status);

    return this.http.get<DevicesProposalResponse[]>(apiUrl, { params }).pipe(
      tap((res) => {
        this.proposalsSubject.next(res || []);
        this.lastStatus = status;
        this.lastFetchTime = Date.now();
      })
    );
  }

  getProposals(status: string | null): Observable<DevicesProposalResponse[]> {
    const currentTime = Date.now();

    if (
      this.proposalsSubject.value.length &&
      this.lastStatus === status &&
      this.lastFetchTime &&
      currentTime - this.lastFetchTime < this.cacheDuration
    ) {
      // Return cached proposals if cache is valid
      return of(this.proposalsSubject.value);
    } else {
      // Fetch from backend if cache is stale or doesn't match status
      return this.fetchProposals(status);
    }
  }

  setStatus(status: string | null): void {
    if (this.statusSubject.value !== status) {
      this.statusSubject.next(status);
    }
  }


  updatProposalStatus(id: string, status: string): Observable<void> {
    const url = `/api/admin/proposal/${id}/update-status`;
    return this.http.put<void>(url, null, { params: { status } });
  }

  deleteProposal(requestId: string | undefined): Observable<void> {
    const apiUrl = `/api/admin/proposal/${requestId}`;
    return this.http.delete<void>(apiUrl);
  }

}
