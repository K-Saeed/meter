import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { map, Observable } from "rxjs";
import { AuthService } from "./auth.service";


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
  login(email: string, password: string): void {
    this.authService.login(email, password).subscribe({
      next: response => {
        localStorage.setItem("JWT_Token", response.token);
        localStorage.setItem("user-profile", JSON.stringify(response));
        localStorage.setItem("permissions", JSON.stringify((response.permissions)));
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


  // decryptPermissions(encryptedData: string): string {

  //   const key = CryptoJS.enc.Utf8.parse('5r!vdqh*@T4cfR3gICbF+N2)yUSG9A6%');

  //   const decrypted = CryptoJS.AES.decrypt(encryptedData, key, {
  //     mode: CryptoJS.mode.CBC,
  //     padding: CryptoJS.pad.Pkcs7,
  //   });

  //   return decrypted.toString(CryptoJS.enc.Utf8);
  // }


}
