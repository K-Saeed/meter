import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from './auth.service';
import { PermissionService } from './permission.service';

@Directive({
  selector: '[appHasPermission]'
})
export class HasPermissionDirective {
  private currentPermission: string = '';

  constructor(
    private permissionService: PermissionService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  // @Input() set appHasPermission(permission: string) {
  //   this.currentPermission = permission;
  //   this.updateView();
  // }
  // private updateView(): void {
  //   this.viewContainer.clear();
  //   if (this.authService.hasPermission(this.currentPermission)) {
  //     this.viewContainer.createEmbeddedView(this.templateRef);
  //   }
  // }

  @Input()
  set appHasPermission(value: { page: string; action: string }) {
    this.viewContainer.clear();
    if (this.hasPermission(value.page,value.action)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

  
  hasPermission(page: string, action: string): boolean {
    return this.permissionService.hasPermission(page, action);

    // const encodedPermissions = localStorage.getItem('permissions');
   
    // if (!encodedPermissions) {
    //   return false;
    // }
    // const decodedPermissions = atob(encodedPermissions);
  
    // const permissions = JSON.parse(decodedPermissions);

    // if (!permissions || !permissions[page]) {
    //   return false;
    // }
  
    // return permissions[page].includes(action);
  }
  
}
