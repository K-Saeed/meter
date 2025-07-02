import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './shared/service/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'meter-dashboard-frontend';
  showSidebarAndTopbar: boolean = false;
  isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.checkAuthentication();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkAuthentication();
      }
    });
  }

  private checkAuthentication() {
    this.showSidebarAndTopbar = this.authService.isAuthenticated() && !this.router.url.includes('/signin');
  }
}