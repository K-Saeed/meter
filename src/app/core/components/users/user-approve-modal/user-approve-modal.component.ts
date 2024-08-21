import { Component, Input } from "@angular/core";
import { UserRquestCallService } from "src/app/shared/service/userRequest-call.service";

@Component({
  selector: "app-user-approve-modal",
  templateUrl: "./user-approve-modal.component.html",
  styleUrls: ["./user-approve-modal.component.css"],
})
export class UserApproveModalComponent {
  @Input() userId?: string;
  message!: string;
  status: string = 'Approved';

  constructor(private userService: UserRquestCallService) {}

  ngOnInit(): void {}
  updateStatus() {
    if (!this.userId) {
      this.message = "User ID is required";
      return;
    }
    this.userService.updateUserStatus(this.userId, this.status).subscribe(
      () => {
        this.message = "Status updated successfully";
        window.location.reload();
      },
      (error) => {
        this.message = "Error updating status";
        console.error("Error:", error);
        window.location.reload();

      }
    );
  }
}
