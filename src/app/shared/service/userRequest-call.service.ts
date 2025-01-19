import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "src/app/core/components/products/models/product.model";
import { SendOtp } from "src/app/core/components/users/models/send-otp.model";
import { DraftUserDto } from "src/app/core/components/users/models/draft-user.model";
import { UserTableDto } from "src/app/core/components/users/models/user-table.model";

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
    console.log(status);
    
    const url = `/api/user/admin/${id}/update-status`;
    return this.http.put<void>(url, null, { params: { status } });
  }

  deleteUser(userId: string | undefined): Observable<void> {
    const apiUrl = `/api/user/delete/${userId}`;
    return this.http.delete<void>(apiUrl);
  }


  sendOTP(phoneNumber: string): Observable<SendOtp> {
    const params = new HttpParams().set('phoneNumber', phoneNumber);
    return this.http.post<SendOtp>(`/api/user/send-otp`, null, { params });
  }


  addUser(formData:FormData){
    const url = `/api/user/register`;
    return this.http.post<void>(url, formData);
  }
  getAllUnfinishedUsers(): Observable<DraftUserDto[]> {
    return this.http.get<DraftUserDto[]>(`/api/admin/user/get-users-unfinished`);
  }

}
