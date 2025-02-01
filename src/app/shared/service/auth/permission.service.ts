import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  private permissions: Record<string, string[]> | null = null;

  constructor() {
    const encodedPermissions = localStorage.getItem('permissions');
    if (encodedPermissions) {
      try {
        const decodedPermissions = atob(encodedPermissions).trim();
        this.permissions = JSON.parse(decodedPermissions);
      } catch (error) {
        console.error('Error in decoding or reading permissions', error);
        this.permissions = {};
      }
    }
  }

  hasPermission(page: string, action: string): boolean {
    
    if (!this.permissions || !this.permissions[page]) {
      return false;
    }
    return this.permissions[page].includes(action);
  }
}