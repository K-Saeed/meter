import { Component, Input } from '@angular/core';
import { UserTableDto } from '../models/user-table.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-user-show-attachment-modal',
  templateUrl: './user-show-attachment-modal.component.html',
  styleUrls: ['./user-show-attachment-modal.component.css']
})
// implements OnInit()
export class UserShowAttachmentModalComponent {
  @Input() user?: UserTableDto;

  selectedFileUrl: SafeResourceUrl | null = null;
  showFilePopup: boolean = false;
  isImageFile: boolean = false;

  constructor(
    private sanitizer: DomSanitizer,
  ) { }

  downloadFile(file: any): void {
    const link = document.createElement("a");
    link.href = file.filePath;
    link.target = "_blank";
    link.download = file.filename || "default-filename";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
