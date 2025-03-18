import { Component, Input } from '@angular/core';
import { RquestCallService } from 'src/app/shared/service/request-call.service';

@Component({
  selector: 'app-request-pending-modal',
  templateUrl: './request-pending-modal.component.html',
  styleUrls: ['./request-pending-modal.component.css']
})
export class RequestPendingModalComponent {
  @Input() requestId?: string;
  message!: string;
  status: string = 'Pending';

  constructor(private requestCallService: RquestCallService) {}

  ngOnInit(): void {}
  updateStatus() {
    if (!this.requestId) {
      this.message = "Request ID is required";
      return;
    }
    this.requestCallService.updateRequestStatus(this.requestId, this.status).subscribe(
      () => {
        this.message = "Status updated successfully";
        window.location.reload();
      },
      (error) => {
        this.message = "Error updating status";
        window.location.reload();
        console.error("Error:", error);
      }
    );
  }
}
