import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { map, Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { v4 as uuidv4 } from 'uuid';


interface ValidateToken {
  token: string;
}
@Injectable({
  providedIn: "root",
})
export class LoginService {
  wrongPasswordOrEmailError = false;
  generalLoginError = false;
  submitClicked = false;
  unverifiedEmailError = false;
  validToken: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  isLoggedIn: boolean = false;


  secretId: string = uuidv4();

  login(email: string, password: string): void {
    this.authService.login(email, password, this.secretId).subscribe({
      next: response => {
        localStorage.setItem("JWT_Token", response.token);
        localStorage.setItem("user-profile", JSON.stringify(response));
        localStorage.setItem("permissions", JSON.stringify(response.role.pagePermission));
        localStorage.setItem("s", this.secretId);

        this.isLoggedIn = true;
        this.router.navigate(["/dashboard"]);
      },
      error: error => {
        console.error('Login failed', error);
      }
    });
  }

  logout(): void {
    localStorage.removeItem("JWT_Token");
    localStorage.removeItem("user-profile");
    localStorage.removeItem("permissions");  // Clear permissions
    localStorage.removeItem("s");
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



}
