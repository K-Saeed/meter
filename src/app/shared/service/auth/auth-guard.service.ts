import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";
import { PermissionService } from "./permission.service";

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
    roles: 'roles',//
    settings: 'dashboard',//
    products: 'products',
    devicesproposal: 'devicesproposal',
    worksubmission: 'work_submission',
    WorkSubmission: 'work_submission',
    chat: 'chat',
    unfinisheduser: 'users',//
  };
  

  
  constructor(
    private router: Router,
    private authService: AuthService,
    private permissionService: PermissionService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isAuthenticated()) {

      // const encodedPermissions = localStorage.getItem('permissions');

      // const decodedPermissions = atob(encodedPermissions??'{}');
  
      // const userPermissions = JSON.parse(decodedPermissions);

      // const userPermissions = JSON.parse(localStorage.getItem('permissions') || '{}');
      const currentRoute = route.routeConfig?.path;
  
      const permissionKey = this.routePermissionMap[currentRoute || ''];
  
      if (permissionKey && this.permissionService.hasPermission(permissionKey,'READ')) {
        return true;
      }
      this.router.navigate(["/dashboard"]);
      return false;
    } else {
      this.router.navigate(["/signin"]); // Redirect to sign-in page if not authenticated
      return false;
    }
  }
}
