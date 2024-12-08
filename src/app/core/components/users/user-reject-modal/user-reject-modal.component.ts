import { Component, Input } from '@angular/core';
import { UserRquestCallService } from 'src/app/shared/service/userRequest-call.service';

@Component({
  selector: 'app-user-reject-modal',
  templateUrl: './user-reject-modal.component.html',
  styleUrls: ['./user-reject-modal.component.css']
})
export class UserRejectModalComponent {
  @Input () userId?: string;
  message!: string;
  status: string = 'Pending';

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
