import { Component } from '@angular/core';
import { EmployeeService } from 'src/app/shared/service/employee.service';
import { RolePermissionsDTO } from '../model/rolePermissions.model';

@Component({
  selector: 'app-role-cards',
  templateUrl: './role-cards.component.html',
  styleUrls: ['./role-cards.component.css']
})
export class RoleCardsComponent {

  selectedRolePermissons: RolePermissionsDTO = new RolePermissionsDTO();

  roles: RolePermissionsDTO[] = []
  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getAllRolesWithPermissions()
  }


  getAllRolesWithPermissions() {
    this.employeeService.getAllRolesWithPermissions().subscribe({
      next: (n) => {
        // console.log(n);
        if (n) {
          this.roles = n;
        }
      },
      error: (e) => {
        console.log(e);
      }
    })
  }

  selectRole(role: RolePermissionsDTO) {
    this.selectedRolePermissons = role;
  }
}
