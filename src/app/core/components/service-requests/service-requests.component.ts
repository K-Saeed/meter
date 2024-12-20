import { Component } from '@angular/core';

@Component({
  selector: 'app-service-requests',
  templateUrl: './service-requests.component.html',
  styleUrls: ['./service-requests.component.css']
})
export class ServiceRequestsComponent {
  searchTerm: string = '';

  handleSearch(term: string) {
    this.searchTerm = term;
  }
}
