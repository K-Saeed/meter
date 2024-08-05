import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  wrongPasswordOrEmailError = false;
  generalLoginError = false;
  submitClicked = false;
    unverifiedEmailError = false;

  constructor(private http: HttpClient, private router: Router) {}

  isLoggedIn: boolean = false;
  login(email: string, password: string): void {
    const apiUrl = `${environment.apiUrl}/api/user/login`;
    const loginDto = { email, password };
    this.http.post<any>(apiUrl, loginDto, {
        headers: { 'Content-Type': 'application/json' }
      }).subscribe((res) => {
          localStorage.setItem("JWT_Token", res.token);
          localStorage.setItem("user-profile", res);
          this.isLoggedIn = true;
          this.router.navigate(['/dashboard']);
        },(error) => {
          if (error.status === 403) {
            this.unverifiedEmailError = true;
          } else if (error.status === 401) {
            this.wrongPasswordOrEmailError = true;
          }
        });
  }

  logout(): void {
    localStorage.removeItem("JWT_Token");
    localStorage.removeItem("user-profile");
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
