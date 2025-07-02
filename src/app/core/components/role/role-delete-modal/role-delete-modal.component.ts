import { Component, Input } from '@angular/core';
import { RolePermissionsDTO } from '../model/rolePermissions.model';
import { EmployeeService } from 'src/app/shared/service/employee.service';

@Component({
  selector: 'app-role-delete-modal',
  templateUrl: './role-delete-modal.component.html',
  styleUrls: ['./role-delete-modal.component.css']
})
export class RoleDeleteModalComponent {

  @Input() role!: RolePermissionsDTO;

  constructor(private employeeService: EmployeeService) { }


  deleteRole() {
    if (this.role && this.role.id) {
      this.employeeService.deleteRoleById(this.role.id).subscribe({
        next: (n) => {
          console.log(n);
        },
        error: (e) => {
          console.log(e);
        },
        complete:()=>{
          window.location.reload();
        }
      })
    }

  }
}
