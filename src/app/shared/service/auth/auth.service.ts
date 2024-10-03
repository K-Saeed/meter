import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const apiUrl = `/api/dashboard/login`;
    const loginDto = { email, password };
    return this.http.post<any>(apiUrl, loginDto, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      withCredentials: true,
    });
  }

  logout(): void {
    localStorage.removeItem("JWT_Token");
    localStorage.removeItem("user-profile");
    localStorage.removeItem("permissions");
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem("JWT_Token");
    return token != null;
  }


  verifyToken(token: string): Observable<boolean> {
    const apiUrl = `/api/user/validateToken`;
    const validateToken = { token };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<any>(apiUrl, validateToken, { headers }).pipe(
      map(response => response === 'Token is valid')
    );
  }


  hasPermission(requiredPermission: string): boolean {
    const storedPermissions = localStorage.getItem('permissions');
    if (!storedPermissions) {
      return false;
    }

    const permissions = JSON.parse(storedPermissions) as Array<{ name: string, permissions: string[] }>;
    return permissions.some(permission => permission.permissions.includes(requiredPermission));
  }
}
