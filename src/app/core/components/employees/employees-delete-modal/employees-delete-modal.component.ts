import { Component, Input } from '@angular/core';
import { EmployeeResponse } from '../model/employee-response.model';

@Component({
  selector: 'app-employees-delete-modal',
  templateUrl: './employees-delete-modal.component.html',
  styleUrls: ['./employees-delete-modal.component.css']
})
export class EmployeesDeleteModalComponent {

  @Input() employee!: EmployeeResponse;
}
