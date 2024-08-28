import { Component,Renderer2 } from '@angular/core';
import { RequestService } from '../service-requests/services/request.service';
import { RequestResponseDto } from '../service-requests/models/request-table.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent {
  isActive: string | null = null;
  requests: RequestResponseDto[] = [];
  status: string = 'Pending';
  type!: string;
  isSidebarOpen = false;


  employees = 'Employees';
  projects = 'Projects';

  isEmployeesOpen = false;
  isProjectsOpen = false;

  constructor(private requestService: RequestService) {}

  ngOnInit(): void {
    this.getRequestList();
  }


  toggleSubmenu(menu: string) {
    if (menu === 'employees') {
      this.isEmployeesOpen = !this.isEmployeesOpen;
    } else if (menu === 'projects') {
      this.isProjectsOpen = !this.isProjectsOpen;
    }
  }
setActive(item: string) {
  this.isActive = item;
}
handleClick(menu: string, activeItem: string) {
  this.toggleSubmenu(menu);
  this.setActive(activeItem);
}
toggleSidebar() {
  this.isSidebarOpen = !this.isSidebarOpen;
}

getRequestList() {
  this.requestService.getRequestsList('', this.status).subscribe(
    (res) => {
      this.requests = res;
    },
    (err) => {
      console.log(err);
    }
  );
}
}
