import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardSummary } from '../dashboard-summary';

@Injectable({
  providedIn: 'root'
})
export class DashboardUsersChartService {


  constructor(private http: HttpClient) { }

  getUserDashboardData(year: number): Observable<any> {
    const url = `/api/user/admin/dashboard/`;

    return this.http.get<any>(`${url}/${year}`);
  }

  getDashboardInfo(): Observable<any> {
    const url = `/api/dashboard/info`;

    return this.http.get<DashboardSummary>(`${url}`);
  }
}
