import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/core/components/employees/model/employee.model';
import { EmployeeResponse } from 'src/app/core/components/employees/model/employee-response.model';
import { RolePermissionsDTO } from 'src/app/core/components/role/model/rolePermissions.model';
import { AddRoleDTO } from 'src/app/core/components/role/model/addRole.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

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

  getAllEmployees(): Observable<EmployeeResponse[]> {
    const apiUrl = '/api/admin/user/get-all-employees';
    return this.http.get<EmployeeResponse[]>(apiUrl);
  }


  editEmployee(employeeDto: Employee
    // , logoImage?: File

  ): Observable<any> {
    const apiUrl = '/api/admin/user/edit-employee';
    const formData: FormData = new FormData();
    formData.append(
      'employeeDto',
      new Blob([JSON.stringify(employeeDto)],
        { type: 'application/json' })
    );
    // if (logoImage) {
    //   formData.append('logo-image', logoImage);
    // }

    return this.http.put<any>(apiUrl, formData);
  }

  deleteEmployee(id: number) {
    const apiUrl = '/api/admin/user/delete-employee';

    return this.http.delete<any>(`${apiUrl}/${id}`);
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


  getAllRolesWithPermissions() {
    const apiUrl = `/api/admin/roles/all-with-permissions`;
    return this.http.get<RolePermissionsDTO[]>(apiUrl);
  }

  deleteRoleById(id: number) {
    const apiUrl = `/api/admin/roles/delete`;
    return this.http.delete<any>(`${apiUrl}/${id}`);
  }

  addRole(addRoleDto: AddRoleDTO): Observable<any> {
    const apiUrl = `/api/admin/roles/add`;
    return this.http.post<any>(apiUrl, addRoleDto);
  }

  editRolePermissionsById(id: number, permissions: { [key: string]: string[] }): Observable<any> {
    const apiUrl = `/api/admin/roles/update`;
    return this.http.put<any>(`${apiUrl}/${id}`, permissions);
  }

}
