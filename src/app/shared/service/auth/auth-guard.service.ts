import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuardService implements CanActivate {

  private routePermissionMap: { [key: string]: string } = {
    dashboard: 'dashboard',
    servicerequests: 'requests',
    users: 'users',
    providersproposal: 'proposals',
    conversations: 'conversations',
    transactions: 'transactions',
    notifications: 'notifications',
    employees: 'employees',
    roles: 'employees',//
    settings: 'dashboard',//
    products: 'products',
    worksubmission: 'work_submission',
    WorkSubmission: 'work_submission',
    chat: 'chat',
    unfinisheduser: 'users',//
  };
  

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isAuthenticated()) {

      const userPermissions = JSON.parse(localStorage.getItem('permissions') || '{}');
      const currentRoute = route.routeConfig?.path;
  
      const permissionKey = this.routePermissionMap[currentRoute || ''];
  
      if (permissionKey && userPermissions[permissionKey]?.includes('READ')) {
        return true;
      }
      this.router.navigate(["/signin"]);
      return false;
    } else {
      this.router.navigate(["/signin"]); // Redirect to sign-in page if not authenticated
      return false;
    }
  }
}
