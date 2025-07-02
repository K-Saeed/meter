import { Component } from "@angular/core";
import { UserService } from "../services/user.service";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: "app-user-filter-modal",
  templateUrl: "./user-filter-modal.component.html",
  styleUrls: ["./user-filter-modal.component.css"],
})
export class UserFilterModalComponent {
  activeRole: string | null = null;
  activeStatus: string | null = null;

  constructor(private userService: UserService, public translateService: TranslateService) { }

  toggleRole(role: string, event: Event): void {
    event.preventDefault();
    if (this.activeRole === role) {
      this.activeRole = null;
    } else {
      this.activeRole = role;
    }
  }

  toggleStatus(status: string, event: Event): void {
    event.preventDefault();
    if (this.activeStatus === status) {
      this.activeStatus = null;
    } else {
      this.activeStatus = status;
    }
  }

  isActiveRole(role: string): boolean {
    return this.activeRole === role;
  }

  isActiveStatus(status: string): boolean {
    return this.activeStatus === status;
  }

  filter(): void {
    const role = this.activeRole;
    const status = this.activeStatus;

    if (role || status) {
      this.userService.setType(role);
      this.userService.setStatus(status);
    } else {
      this.userService.setType('');
      this.userService.setStatus('');
    }
  }
}
