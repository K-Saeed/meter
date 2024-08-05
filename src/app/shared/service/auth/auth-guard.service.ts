import { Injectable } from "@angular/core";
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
} from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({ providedIn: "root" })
export class AuthGuardService implements CanActivateChild {
  constructor(
    private router: Router,
    private authenticationService: AuthService
  ) {}

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authenticationService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(["/Login"]);
      return false;
    }
  }
}
