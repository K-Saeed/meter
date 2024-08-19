import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "src/app/core/components/products/models/product.model";
import { RequestResponseDto } from "src/app/core/components/service-requests/models/request-table.model";
import { environment } from "src/environments/environment";

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
      "Access-Control-Allow-Headers": "Content-Type",
    };

    return {
      headers: new HttpHeaders(headerDict),
      params: {},
    };
  }

  getAllRequest(type: string | null, status: string | null): Observable<RequestResponseDto[]> {
    this.apiUrl =  `${environment.apiUrl}/api/admin/request/all`;
   if(status != null && type === null){
       this.apiUrl = `${environment.apiUrl}/api/admin/request/all?status=${status}`
   }else if(type != null && status === null){
     this.apiUrl = `${environment.apiUrl}/api/admin/request/all?type=${type}`
   }else if (type != null && status != null){
     this.apiUrl = `${environment.apiUrl}/api/admin/request/all?type=${type}&status=${status}`
   }
   return this.http.get<RequestResponseDto[]>(this.apiUrl);
 }

  deleteRequest(productId: number | undefined): Observable<void> {
    const apiUrl = `${environment.apiUrl}/api/dashboard/delete/product?productId=${productId}`;
    return this.http.delete<void>(apiUrl);
  }

}
