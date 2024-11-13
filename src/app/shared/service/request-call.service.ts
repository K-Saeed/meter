import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "src/app/core/components/products/models/product.model";
import { RequestResponseDto } from "src/app/core/components/service-requests/models/request-table.model";

@Injectable({
  providedIn: "root",
})
export class RquestCallService {
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

  getAllRequest(type: string | null, status: string | null): Observable<RequestResponseDto[]> {
    this.apiUrl =  `/api/admin/request/all`;
   if(status != null && type === null){
       this.apiUrl = `/api/admin/request/all?status=${status}`
   }else if(type != null && status === null){
     this.apiUrl = `/api/admin/request/all?type=${type}`
   }else if (type != null && status != null){
     this.apiUrl = `/api/admin/request/all?type=${type}&status=${status}`
   }
   return this.http.get<RequestResponseDto[]>(this.apiUrl);
 }

  deleteRequest(requestId: string | undefined): Observable<void> {
    const apiUrl = `/api/admin/request/${requestId}`;
    return this.http.delete<void>(apiUrl);
  }


  updateRequestStatus(id: string, status: string): Observable<void> {
    const url = `/api/admin/request/${id}/update-internal-status`;
    return this.http.put<void>(url, null, { params: { status } });
  }

  updateRequest(id:string ,updatedRequest:FormData) {
    const url = `/api/request/update/${id}`;

    return this.http.put<void>(url, updatedRequest);
  }
}
