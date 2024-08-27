import { Component, Input } from '@angular/core';
import { RequestResponseDto } from '../models/request-table.model';
import { RquestCallService } from 'src/app/shared/service/request-call.service';

@Component({
  selector: 'app-request-delete-modal',
  templateUrl: './request-delete-modal.component.html',
  styleUrls: ['./request-delete-modal.component.css']
})
export class RequestDeleteModalComponent {
  @Input () request?: RequestResponseDto;


  constructor(private requestService: RquestCallService) { }

  deleteRequest(requestId: string | undefined): void {
    if (requestId !== undefined) {
      if (requestId) {
        this.requestService.deleteRequest(requestId).subscribe(
          () => {
            window.location.reload();
            console.log('Request deleted successfully');
          },
          error => {
            console.error('Error deleting request', error);
          }
        );
      } else {
        console.error('Request ID is not a valid number');
      }
    } else {
      console.error('Request ID is undefined');
    }
  }

}
