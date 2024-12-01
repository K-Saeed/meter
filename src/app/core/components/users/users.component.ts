import { Component } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  searchTerm: string = '';

  handleSearch(term: string) {
    this.searchTerm = term; // Update the search term
  }
}
