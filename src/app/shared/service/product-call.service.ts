import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "src/app/core/components/products/models/product.model";
import { UserTableDto } from "src/app/core/components/users/models/user-table.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ProductCallService {
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


  getProductList(status: string | null): Observable<Product[]> {
    const apiUrl = status
      ? `/api/dashboard/all/products?status=${status}`
      : `/api/dashboard/all/products`;
    return this.http.get<Product[]>(apiUrl);
  }


  deleteProduct(productId: string | undefined): Observable<void> {
    const apiUrl = `/api/dashboard/delete/product?productId=${productId}`;
    return this.http.delete<void>(apiUrl);
  }


  updateProductStatus(id: string, status: string): Observable<void> {
    const url = `/api/product/${id}/update-status`;
    return this.http.put<void>(url, null, { params: { status } });
  }



}
