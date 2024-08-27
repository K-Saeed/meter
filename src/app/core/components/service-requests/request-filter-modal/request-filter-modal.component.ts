import { Component, Input } from "@angular/core";
import { RequestResponseDto } from "../models/request-table.model";
import { RequestService } from "../services/request.service";

@Component({
  selector: "app-request-filter-modal",
  templateUrl: "./request-filter-modal.component.html",
  styleUrls: ["./request-filter-modal.component.css"],
})
export class RequestFilterModalComponent {
  @Input() request?: RequestResponseDto;
  activeType: string | null = null;
  activeStatus: string | null = null;

  constructor(private requestService: RequestService) { }

  toggleType(type: string, event: Event): void {
    event.preventDefault();
    if (this.activeType === type) {
      this.activeType = null;
    } else {
      this.activeType = type;
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

  isActiveType(type: string): boolean {
    return this.activeType === type;
  }

  isActiveStatus(status: string): boolean {
    return this.activeStatus === status;
  }

  filter(): void {
    this.requestService.setType(this.activeType);
    this.requestService.setStatus(this.activeStatus);
  }
}
