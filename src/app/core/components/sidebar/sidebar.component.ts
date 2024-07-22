import { Component,Renderer2 } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent {
  
  employees = 'Employees';
  projects = 'Projects';

  isEmployeesOpen = false;
  isProjectsOpen = false;

  toggleSubmenu(menu: string) {
    if (menu === 'employees') {
      this.isEmployeesOpen = !this.isEmployeesOpen;
    } else if (menu === 'projects') {
      this.isProjectsOpen = !this.isProjectsOpen;
    }
  }
}
