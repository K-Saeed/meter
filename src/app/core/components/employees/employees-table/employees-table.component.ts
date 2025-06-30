import { Component, Input, SimpleChanges } from '@angular/core';
import { EmployeeService } from 'src/app/shared/service/employee.service';
import { EmployeeResponse } from '../model/employee-response.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-employees-table',
  templateUrl: './employees-table.component.html',
  styleUrls: ['./employees-table.component.css']
})
export class EmployeesTableComponent {

  @Input() searchTerm: string = '';
  filteredUsers: EmployeeResponse[] = [];
  selectAll: boolean = false;
  users: EmployeeResponse[] = [];
  currentLang: string = 'en';

  selectedEmployee: EmployeeResponse = new EmployeeResponse();

  constructor(private employeeService: EmployeeService, private translateService: TranslateService
  ) { this.currentLang = this.translateService.currentLang; }

  currentPage: number = 1;
  itemsPerPage: number = 4;
  Math = Math;

  ngOnInit(): void {
    this.getAllEmployees()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['searchTerm'] && !changes['searchTerm'].firstChange) {
      this.filterUsers();
    }
  }


  filterUsers() {
    const term = this.searchTerm.toLowerCase();
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.phoneNumber.toLowerCase().includes(term)
    );
  }

  toggleAll(event: Event) {
    event.preventDefault();
    this.users.forEach(user => user.selected = this.selectAll);
  }

  checkIfAllSelected() {
    this.selectAll = this.users.every(user => user.selected);
  }

  selectEmployee(employee: EmployeeResponse) {
    console.log(employee);

    this.selectedEmployee = employee;
  }

  getAllEmployees() {
    this.employeeService.getAllEmployees().subscribe({
      next: (n) => {
        console.log(n);
        if (n) {
          this.users = n;
          this.filteredUsers = this.users;
        }
      },
      error: (e) => {
        console.log(e);
      }
    })
  }
  get paginatedUsers() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredUsers.slice(start, end);
  }

  setPage(page: number, event: Event) {
    event.preventDefault();
    this.currentPage = page;
  }
}
