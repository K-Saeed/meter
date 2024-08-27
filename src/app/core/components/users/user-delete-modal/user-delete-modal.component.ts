import { Component, Input } from '@angular/core';
import { UserRquestCallService } from 'src/app/shared/service/userRequest-call.service';

@Component({
  selector: 'app-user-delete-modal',
  templateUrl: './user-delete-modal.component.html',
  styleUrls: ['./user-delete-modal.component.css']
})
export class UserDeleteModalComponent {
  @Input() userId?: string;
  message!: string;
  status: string = 'Approved';
  constructor(private userService: UserRquestCallService) {}
 deleteUser() {
    if (!this.userId) {
      this.message = "User ID is required";
      return;
    }
    this.userService.deleteUser(this.userId).subscribe(
      () => {
        this.message = "User Deleted Sucssesful";
        window.location.reload();
      },
      (error) => {
        this.message = "Error deleting user";
        console.error("Error:", error);
        window.location.reload();

      }
    );
  }

}
