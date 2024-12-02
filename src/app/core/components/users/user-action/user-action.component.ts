import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-user-action',
  templateUrl: './user-action.component.html',
  styleUrls: ['./user-action.component.css']
})
export class UserActionComponent {
  searchTerm: string = '';

  @Output() searchChanged: EventEmitter<string> = new EventEmitter<string>();

  applySearch() {
    this.searchChanged.emit(this.searchTerm);
  }
}
