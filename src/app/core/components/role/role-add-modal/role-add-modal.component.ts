import { Component, OnInit } from '@angular/core';
import { RoleService } from '../service/role.service';

@Component({
  selector: 'app-role-add-modal',
  templateUrl: './role-add-modal.component.html',
  styleUrls: ['./role-add-modal.component.css']
})
export class RoleAddModalComponent implements OnInit {
  selectAll: boolean = false;
  pages: any[] = [];
  roleName: string = '';
  constructor(
    private roleService: RoleService
  ) {}

  ngOnInit() {
    this.loadPages();
  }

  loadPages() {

    this.pages = [
      { id: 1, name: 'Dashboard', view: false, edit: false, delete: false, add: false },
      { id: 2, name: 'Users', view: false, edit: false, delete: false, add: false },
      { id: 3, name: 'Requests', view: false, edit: false, delete: false, add: false },
      { id: 4, name: 'Proposals', view: false, edit: false, delete: false, add: false },
      { id: 5, name: 'Work Submission', view: false, edit: false, delete: false, add: false },
      { id: 6, name: 'Transactions', view: false, edit: false, delete: false, add: false },
      { id: 7, name: 'Products', view: false, edit: false, delete: false, add: false },
      { id: 8, name: 'Notifications', view: false, edit: false, delete: false, add: false },
      { id: 9, name: 'Employees', view: false, edit: false, delete: false, add: false },
      { id: 10, name: 'Roles', view: false, edit: false, delete: false, add: false },
    ];
  }


  saveRole() {
    const roleDto = {
      name: this.roleName,
      pagePermission: this.pages.map(page => ({
        id: page.id,
        name: page.name,
        permissions: ['view', 'edit', 'delete', 'add'].filter(perm => page[perm])
      }))
    };

    this.roleService.addRole(roleDto).subscribe({
      next: () => alert('Role added successfully!'),
      error: (error) => alert('Error adding role: ' + error.message)
    });
  }

  checkIfAllSelected() {
    this.selectAll = this.pages.every(page => page.view && page.edit && page.delete && page.add);
  }

  toggleAll(event: Event) {
    event.preventDefault();
    this.selectAll = !this.selectAll;
    this.pages.forEach(page => {
      page.view = this.selectAll;
      page.edit = this.selectAll;
      page.delete = this.selectAll;
      page.add = this.selectAll;
    });
  }

}
