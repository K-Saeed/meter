import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";


interface ValidateToken {
  token: string;
}
@Injectable({
  providedIn: "root",
})
export class AuthService {
  wrongPasswordOrEmailError = false;
  generalLoginError = false;
  submitClicked = false;
  unverifiedEmailError = false;
  validToken: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  isLoggedIn: boolean = false;
  login(email: string, password: string): void {
    const apiUrl = `${environment.apiUrl}/api/user/login`;
    const loginDto = { email, password };
    this.http
      .post<any>(apiUrl, loginDto, {
        headers: { "Content-Type": "application/json" },
        withCredentials: false,
      })
      .subscribe(
        (res) => {
          localStorage.setItem("JWT_Token", res.token);
          localStorage.setItem("user-profile", JSON.stringify(res));
          this.isLoggedIn = true;
          this.router.navigate(["/dashboard"]);
        },
        (error) => {
          if (error.status === 403) {
            this.unverifiedEmailError = true;
          } else if (error.status === 401) {
            this.wrongPasswordOrEmailError = true;
          }
        }
      );
  }

  logout(): void {
    localStorage.removeItem("JWT_Token");
    localStorage.removeItem("user-profile");
    this.isLoggedIn = false;
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem("JWT_Token");
    // if(!this.isLoggedIn ||token != null){
    //   this.verifyToken(token).subscribe(
    //     isAuthenticated => {
    //       this.validToken = isAuthenticated;
    //     },
    //     error => {
    //       console.error('Error checking authentication', error);
    //       this.validToken = false;
    //     }
    //   );
    // (token != null && this.validToken)
    // }
    if (token != null) {
      return true;
    } else {
      return false;
    }
  }

  verifyToken(token: string): Observable<boolean> {
    const apiUrl = `${environment.apiUrl}/api/user/validateToken`;
    const validateToken: ValidateToken = { token };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<any>(apiUrl, validateToken, { headers }).pipe(
      map(response => response === 'Token is valid')
    );  }

}
