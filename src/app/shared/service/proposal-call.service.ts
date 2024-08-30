import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "src/app/core/components/products/models/product.model";
import { ProposalResponse } from "src/app/core/components/providers-proposals/models/porposal-table.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ProposalCallService {
  constructor(private http: HttpClient) {}

  product?: Product[];
  apiUrl!: string;
  getHeaders() {
    const headerDict = {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    return {
      headers: new HttpHeaders(headerDict),
      params: {},
    };
  }


 getAllProposals(status: string | null): Observable<ProposalResponse[]> {
  const apiUrl = status
    ? `/api/admin/proposal/all?status=${status}`
    : `/api/admin/proposal/all`;
  return this.http.get<ProposalResponse[]>(apiUrl);
}


  deleteProposal(requestId: string | undefined): Observable<void> {
    const apiUrl = `/api/admin/proposal/${requestId}`;
    return this.http.delete<void>(apiUrl);
  }


  updatProposalStatus(id: string, status: string): Observable<void> {
    const url = `/api/admin/proposal/${id}/update-status`;
    return this.http.put<void>(url, null, { params: { status } });
  }




}
