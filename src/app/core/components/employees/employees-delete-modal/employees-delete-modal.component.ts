import { Component, Input } from '@angular/core';
import { EmployeeResponse } from '../model/employee-response.model';
import { EmployeeService } from 'src/app/shared/service/employee.service';

@Component({
  selector: 'app-employees-delete-modal',
  templateUrl: './employees-delete-modal.component.html',
  styleUrls: ['./employees-delete-modal.component.css']
})
export class EmployeesDeleteModalComponent {

  @Input() employee!: EmployeeResponse;

    constructor(private employeeService: EmployeeService) { }
  

    delete(){
      this.employeeService.deleteEmployee(this.employee.id).subscribe({
        next:(n)=>{
          console.log(n);
        },
        error:(e)=>{
          console.log(e);
        }
      })
    }
    

}
