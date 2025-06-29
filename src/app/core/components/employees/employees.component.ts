import { Component } from '@angular/core';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent {
  searchTerm: string = '';

  handleSearch(term: string) {
    this.searchTerm = term;
  }
}
