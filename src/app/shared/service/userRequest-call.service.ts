import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "src/app/core/components/products/models/product.model";
import { UserTableDto } from "src/app/core/components/users/models/user-table.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class UserRquestCallService {
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


  updateUserStatus(id: string, status: string): Observable<void> {
    const url = `${environment.apiUrl}/api/user/${id}/update-status`;
    return this.http.put<void>(url, null, { params: { status } });
  }
}
