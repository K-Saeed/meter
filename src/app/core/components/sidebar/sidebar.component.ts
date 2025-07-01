import { Component, Renderer2, OnInit } from '@angular/core';
import { RequestService } from '../service-requests/services/request.service';
import { RequestResponseDto } from '../service-requests/models/request-table.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {
  isActive: string | null = null;
  requests: RequestResponseDto[] = [];
  status: string = 'Pending';
  type!: string;
  isSidebarOpen = false;
  userPermissions: any;

  employees = 'Employees';
  projects = 'Projects';

  isEmployeesOpen = false;
  isProjectsOpen = false;
  currentLang: 'en' | 'ar' = 'ar';
  constructor(private requestService: RequestService, private translateService: TranslateService) {
    const savedLang = (localStorage.getItem('lang') as 'en' | 'ar') || 'ar';
    this.currentLang = savedLang;
    translateService.setDefaultLang(savedLang);
    translateService.use(savedLang);
    document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';
    console.log(savedLang);

  }

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

  hasPermission(page: string, action: string): boolean {
    if (!this.userPermissions || !this.userPermissions[page]) {
      return false;
    }
    return this.userPermissions[page].includes(action);
  }
  switchLanguage(lang: 'en' | 'ar') {
    this.translateService.use(lang);
    this.currentLang = lang;
    localStorage.setItem('lang', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }
}
