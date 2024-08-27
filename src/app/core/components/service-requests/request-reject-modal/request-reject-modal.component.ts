import { Component, Input } from '@angular/core';
import { RquestCallService } from 'src/app/shared/service/request-call.service';

@Component({
  selector: 'app-request-reject-modal',
  templateUrl: './request-reject-modal.component.html',
  styleUrls: ['./request-reject-modal.component.css']
})
export class RequestRejectModalComponent {
  @Input() requestId?: string;
  message!: string;
  status: string = 'Rejected';

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
