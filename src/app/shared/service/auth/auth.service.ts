import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, of } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  isLoggedIn: boolean = false;
  login(email: string, password: string): Observable<any> {
    const apiUrl = `${environment.apiUrl}/api/user/login`;
    const loginDto = { email, password };
    return this.http.post<any>(apiUrl, loginDto, {
        // withCredentials: true,
        headers: { 'Content-Type': 'application/json' }
      }).pipe(
          map((res) => {
          localStorage.setItem("JWT_Token", res.body.token);
          this.isLoggedIn = true;
          return true;
         }),
          catchError((error) => {
          console.log(error);
          this.isLoggedIn = false;
          return of(false);
          })
      );
  }

  logout(): void {
    localStorage.removeItem("JWT_Token");
    this.isLoggedIn = false;
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem("JWT_Token");
    if(token != null && this.isLoggedIn){
      return true;
    }else{
      return false;
    }
  }
}
