import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from './auth.service';

@Directive({
  selector: '[appHasPermission]'
})
export class HasPermissionDirective {
  private currentPermission: string = '';

  constructor(
    private authService: AuthService,
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
    const userPermissions = localStorage.getItem('permissions');
  
    if (!userPermissions) {
      return false;
    }
  
    const permissions = JSON.parse(userPermissions);
  
    if (!permissions || !permissions[page]) {
      return false;
    }
  
    return permissions[page].includes(action);
  }
  
}
