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
      "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI4N2I1YjZiZi05NGFjLTQ0ZWUtYmQ5Ni1kYWVhZmFiOWM3OGYiLCJhdSI6WyJQcm92aWRlciJdLCJlIjoiZW1tb2hhbWVkOTAyQGdtYWlsLmNvbSIsImV4cCI6MTcyNTU4MTc3NywiaWF0IjoxNzI1MDYzMzc3fQ.jJVo2Zd1dun8fsPWWJY0QrI10B4NnKAsqMojJXMMBkE"
    };

    return {
      headers: new HttpHeaders(headerDict),
      params: {},
    };
  }
  getAllUsers(role: string | null, status: string | null): Observable<UserTableDto[]> {
    this.apiUrl =  `/api/user/admin/all`;
   if(status != null && role === null){
       this.apiUrl = `/api/user/admin/all?status=${status}`
   }else if(role != null && status === null){
     this.apiUrl = `/api/user/admin/all?role=${role}`
   }else if (role != null && status != null){
     this.apiUrl = `/api/user/admin/all?role=${role}&status=${status}`
   }
   return this.http.get<UserTableDto[]>(this.apiUrl);
 }


  updateUserStatus(id: string, status: string): Observable<void> {
    const url = `/api/user/admin/${id}/update-status`;
    return this.http.put<void>(url, null, { params: { status } });
  }

  deleteUser(userId: string | undefined): Observable<void> {
    const apiUrl = `/api/user/delete/${userId}`;
    return this.http.delete<void>(apiUrl);
  }

}
