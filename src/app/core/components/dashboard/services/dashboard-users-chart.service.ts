import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  getDashboardInfo(year: number): Observable<DashboardSummary> {
    const url = `/api/dashboard/info`;
    const params = new HttpParams().set('year', year.toString());

    return this.http.get<DashboardSummary>(url, { params });
  }
}
