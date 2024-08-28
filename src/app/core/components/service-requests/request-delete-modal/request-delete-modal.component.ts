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
    console.log('deleteRequest method called with requestId:', requestId);
    if (requestId !== undefined) {
      if (requestId) {
        this.requestService.deleteRequest(requestId).subscribe({
          next: (res) => {
            console.log('Request deleted successfully, reloading page');
            window.location.reload();
          },
          error: (error) => {
            console.error('Error deleting request', error);
          }
        });
      } else {
        console.error('Request ID is not a valid number');
      }
    } else {
      console.error('Request ID is undefined');
    }
    window.location.reload();

  }

}
