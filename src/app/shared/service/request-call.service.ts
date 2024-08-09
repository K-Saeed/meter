import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "src/app/core/components/products/models/product.model";
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

  getProductList(status: string | null): Observable<Product[]> {
    const apiUrl = status
      ? `${environment.apiUrl}/api/dashboard/all/products?status=${status}`
      : `${environment.apiUrl}/api/dashboard/all/products`;
    return this.http.get<Product[]>(apiUrl);
  }

  getAllUsers(role: string | null, status: string | null): Observable<Product[]> {
     this.apiUrl =  `${environment.apiUrl}/api/user/all`;
    if(status != null && role === null){
        this.apiUrl = `${environment.apiUrl}/api/dashboard/all?status=${status}`
    }else if(role != null && status === null){
      this.apiUrl = `${environment.apiUrl}/api/dashboard/all?role=${role}`
    }else if (role != null && status != null){
      this.apiUrl = `${environment.apiUrl}/api/dashboard/all?role=${role}&status=${status}`
    }
    return this.http.get<Product[]>(this.apiUrl);
  }

  deleteProduct(productId: number | undefined): Observable<void> {
    const apiUrl = `${environment.apiUrl}/api/dashboard/delete/product?productId=${productId}`;
    return this.http.delete<void>(apiUrl);
  }
}
