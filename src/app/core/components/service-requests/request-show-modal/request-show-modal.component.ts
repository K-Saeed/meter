import { Component, Input } from '@angular/core';
import { RequestResponseDto } from '../models/request-table.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-request-show-modal',
  templateUrl: './request-show-modal.component.html',
  styleUrls: ['./request-show-modal.component.css']
})
export class RequestShowModalComponent {
  @Input () request?: RequestResponseDto;

  activeLink: string = 'details';
  constructor(private http: HttpClient) { }

  setActiveLink(link: string, event: Event) {
    event.preventDefault();
    this.activeLink = link;
  }

  downloadFile(file: any): void {
    // Fetch the file as a Blob
    this.http.get(file.filePath, { responseType: 'blob' }).subscribe(blob => {
      // Create a URL for the Blob object
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;

      link.download = file.fileName || 'download';
      link.click();
      window.URL.revokeObjectURL(url);
    });
  }
}
