import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/core/components/employees/model/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) {}

  addEmployee(employeeDto: Employee, logoImage?: File): Observable<any> {
    const apiUrl = '/api/admin/user/add-employee';
    const formData: FormData = new FormData();
    formData.append(
      'employeeDto',
       new Blob([JSON.stringify(employeeDto)],
        { type: 'application/json' })
      );
    if (logoImage) {
      formData.append('logo-image', logoImage);
    }

    return this.http.post<any>(apiUrl, formData);
  }

  sendOtp(phoneNumber: string): Observable<any> {
    const apiUrl = '/api/user/send/mobileOTP';

    return this.http.post<any>(apiUrl, null, { params: { phoneNumber } });
  }

  verifyOtp(otp: string, id: string, mobile: string): Observable<any> {
    const apiUrl = '/api/user/verify/mobileOT';

    return this.http.post<any>(apiUrl, { otp, id, mobile });
  }

  getAllRoles(): Observable<any> {
    const url = `/api/admin/roles/all`;
    return this.http.get<any>(url);
  }
}
