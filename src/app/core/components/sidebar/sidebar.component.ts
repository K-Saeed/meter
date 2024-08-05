import { Component,Renderer2 } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent {
  isActive: string | null = null; 

 
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
setActive(item: string) {
  this.isActive = item;
}
handleClick(menu: string, activeItem: string) {
  this.toggleSubmenu(menu);
  this.setActive(activeItem);
}
}
