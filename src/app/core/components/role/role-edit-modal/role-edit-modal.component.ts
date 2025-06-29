import { Component, Input, OnInit } from '@angular/core';
import { RolePermissionsDTO } from '../model/rolePermissions.model';
import { EmployeeService } from 'src/app/shared/service/employee.service';

@Component({
  selector: 'app-role-edit-modal',
  templateUrl: './role-edit-modal.component.html',
  styleUrls: ['./role-edit-modal.component.css']
})
export class RoleEditModalComponent {

  @Input() role!: RolePermissionsDTO;

  constructor(private employeeService: EmployeeService) { }

  selectAll: boolean = false;
  pages: any[] = [];

  ngOnChanges() {
    this.loadPages();
  }

  loadPages() {
    const permissions = this.role?.permissions || {};

    this.pages = [
      { id: 1, name: 'Dashboard' },
      { id: 2, name: 'Users' },
      { id: 3, name: 'Requests' },
      { id: 4, name: 'Proposals' },
      { id: 5, name: 'Work Submission' },
      { id: 6, name: 'Transactions' },
      { id: 7, name: 'Products' },
      { id: 8, name: 'Notifications' },
      { id: 9, name: 'Employees' },
      { id: 10, name: 'Roles' },
      { id: 11, name: 'Conversations' },
      { id: 12, name: 'Chat' },
    ].map(page => {
      const key = page.name.toLowerCase().replace(/\s/g, '_');

      const pagePerms = permissions[key] || [];

      return {
        ...page,
        view: pagePerms.includes('READ'),
        edit: pagePerms.includes('EDIT'),
        delete: pagePerms.includes('DELETE'),
        add: pagePerms.includes('WRITE'),
      };
    });
    console.log(this.pages);

  }

  editRoles() {
    const permissions: { [key: string]: string[] } = {};

    this.pages.forEach(page => {
      const perms: string[] = [];
      if (page.view) perms.push('READ');
      if (page.edit) perms.push('EDIT');
      if (page.delete) perms.push('DELETE');
      if (page.add) perms.push('WRITE');

      if (perms.length > 0) {
        permissions[page.name.toLowerCase().replace(/\s/g, '_')] = perms;
      }
    });

    if (this.role && this.role.id) {
      this.employeeService.editRolePermissionsById(this.role.id, permissions).subscribe({
        next: (n) => {
          console.log('Updated Successfully', n);
        },
        error: (e) => {
          console.error('Error Updating', e);
        },
        complete:()=>{
          window.location.reload();
        }
      });
    }
  }

  checkIfAllSelected() {
    this.selectAll = this.pages.every(page => page.view && page.edit && page.delete && page.add);
  }

  toggleAll(event: Event) {
    event.preventDefault();
    this.pages.forEach(page => {
      page.view = this.selectAll;
      page.edit = this.selectAll;
      page.delete = this.selectAll;
      page.add = this.selectAll;
    });
  }
}
