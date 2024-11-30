import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationResponse } from 'src/app/core/components/notifications/models/notification-response.model';
import { NotificationDto } from 'src/app/core/components/notifications/models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }


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


  getAllNotifications(): Observable<NotificationResponse[]> {
    const apiUrl = `/api/notification/all`;
    return this.http.get<NotificationResponse[]>(apiUrl);
  }

  sendNotificationToCategory(notification: NotificationDto, categories: string[]): Observable<[]> {
    const apiUrl = `/api/notification/send-by-category`;

    const params = new HttpParams().set('categories', categories.join(','));

    return this.http.post<[]>(apiUrl, notification, { params });
  }

  sendNotificationToSpecificUsers(notification: NotificationDto, emails: string[]): Observable<[]> {
    const apiUrl = `/api/notification/send/users`;

    const params = new HttpParams().set('categories', emails.join(','));

    return this.http.post<[]>(apiUrl, notification, { params });
  }

}