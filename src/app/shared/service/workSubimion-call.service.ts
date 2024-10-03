import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "src/app/core/components/products/models/product.model";
import { WorkSubmissionResponse } from "src/app/core/components/work-submission/models/work-submission-response {.model";

@Injectable({
  providedIn: "root",
})
export class WorkSubmisionCallService {
  constructor(private http: HttpClient) {}

  product?: Product[];
  apiUrl!: string;
  getHeaders() {
    const headerDict = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    return {
      headers: new HttpHeaders(headerDict),
      params: {},
    };
  }

  getAllWorkSubmission(status: string | null): Observable<WorkSubmissionResponse> {
    const apiUrl = status
      ? `/api/admin/work-submission/all?status=${status}`
      : `/api/admin/work-submission/all`;
    return this.http.get<WorkSubmissionResponse>(apiUrl);
  }

  deleteRequest(id: string | undefined, type: string | undefined,): Observable<void> {
    const apiUrl = `/api/admin/request/${id}/type/${type}`;
    return this.http.delete<void>(apiUrl);
  }


  updateWorkSubmissionStatus(id: string, type: string, status: string): Observable<void> {
    const url = `/api/admin/work-submission/${id}/type/${type}/update-status`;
    const params = new HttpParams().set('status', status);
    return this.http.put<void>(url, null, { params });
  }


  deleteWorkSubmission(id: string, type: string): Observable<void> {
    const url = `/api/admin/work-submissions/${id}/type/${type}`;
    return this.http.delete<void>(url);
  }

}
