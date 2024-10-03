import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardUsersChartService {


  constructor(private http: HttpClient) { }

  getUserDashboardData(year: number): Observable<any> {
    const url = `/api/user/admin/dashboard/`;

    return this.http.get<any>(`${url}/${year}`);
  }
}
