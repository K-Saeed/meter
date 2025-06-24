import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-employees-action',
  templateUrl: './employees-action.component.html',
  styleUrls: ['./employees-action.component.css']
})
export class EmployeesActionComponent {
  
  searchTerm: string = '';
  
  @Output() searchChanged: EventEmitter<string> = new EventEmitter<string>();

  applySearch() {
    this.searchChanged.emit(this.searchTerm);
  }
}
