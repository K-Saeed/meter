import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  addRole(roleDto: any): Observable<any> {
    const apiUrl = '/api/admin/roles/add';
    return this.http.post(apiUrl, roleDto);
  }
}
