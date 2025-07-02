import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/service/employee.service';
import { TranslateService } from '@ngx-translate/core';

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
    private employeeService: EmployeeService, public translateService: TranslateService
  ) { }

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
      { id: 11, name: 'Conversations', view: false, edit: false, delete: false, add: false },
      { id: 12, name: 'Chat', view: false, edit: false, delete: false, add: false },
    ];
  }


  saveRole() {
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

    const roleDto = {
      name: this.roleName,
      permissions: permissions
    };

    console.log(roleDto);
    this.employeeService.addRole(roleDto).subscribe({
      next: (n) => {
        console.log(n)
      },
      error: (e) => {
        console.log(e)
      },
        complete:()=>{
          window.location.reload();
        }
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
