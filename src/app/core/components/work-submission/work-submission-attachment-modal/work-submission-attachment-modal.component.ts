import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-work-submission-attachment-modal',
  templateUrl: './work-submission-attachment-modal.component.html',
  styleUrls: ['./work-submission-attachment-modal.component.css']
})
export class WorkSubmissionAttachmentModalComponent {
  @Input() submission: any; // Input to receive submission details
  showFilePopup: boolean = false;
  selectedFileUrl: SafeResourceUrl | null = null;
  isImageFile: boolean = false;
  constructor(
    private sanitizer: DomSanitizer
    ) {}

  downloadFile(file: any): void {
    const link = document.createElement("a");
    link.href = file.filePath;
    link.target = "_blank";
    link.download = file.filename || "default-filename";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  closePopup() {
    this.showFilePopup = false;
    this.selectedFileUrl = null;
  }

  openFileInPopup(file: any) {
    const filePath = file.filePath;
    this.isImageFile = /\.(png|jpg|jpeg)$/.test(filePath);
    this.selectedFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      filePath + (this.isImageFile ? "" : "#toolbar=0")
    );
    this.showFilePopup = true;
  }
}
