import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-request-action',
  templateUrl: './request-action.component.html',
  styleUrls: ['./request-action.component.css']
})
export class RequestActionComponent {
  searchTerm: string = '';

  @Output() searchChanged: EventEmitter<string> = new EventEmitter<string>();

  applySearch() {
    this.searchChanged.emit(this.searchTerm);
  }
}
