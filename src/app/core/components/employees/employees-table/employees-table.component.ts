import { Component } from '@angular/core';
import { EmployeeService } from 'src/app/shared/service/employee.service';
import { EmployeeResponse } from '../model/employee-response.model';

@Component({
  selector: 'app-employees-table',
  templateUrl: './employees-table.component.html',
  styleUrls: ['./employees-table.component.css']
})
export class EmployeesTableComponent {
  selectAll: boolean = false;
  users: EmployeeResponse[] =[];

  selectedEmployee: EmployeeResponse = new EmployeeResponse();

  constructor( private employeeService: EmployeeService) {}
  currentPage: number = 1;
  itemsPerPage: number = 4;
  Math = Math;

  ngOnInit(): void {
    this.getAllEmployees()
  }
  toggleAll(event: Event) {
    event.preventDefault();
    this.users.forEach(user => user.selected = this.selectAll);
  }

  checkIfAllSelected() {
    this.selectAll = this.users.every(user => user.selected);
  }

  selectEmployee(employee: EmployeeResponse){
    this.selectedEmployee = employee;
  }

  getAllEmployees(){
    this.employeeService.getAllEmployees().subscribe({
      next:(n)=>{
        console.log(n);
        if(n){
          this.users = n;
        }
      },
      error:(e)=>{
        console.log(e);
      }
    })
  }
  get paginatedUsers() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.users.slice(start, end);
  }

  setPage(page: number, event: Event) {
    event.preventDefault();
    this.currentPage = page;
  }
}
