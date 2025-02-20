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



  closePopup() {
    this.showFilePopup = false;
    this.selectedFileUrl = null;
  }

  openFileInPopup(file: any) {
    console.log("File clicked:", file);
    const filePath = file.filePath;
    this.isImageFile = /\.(png|jpg|jpeg)$/.test(filePath);
    const safeUrl = filePath + (this.isImageFile ? "" : "#toolbar=0");
    console.log("Safe URL:", safeUrl);
    this.selectedFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(safeUrl);
    this.showFilePopup = true;
  }




  downloadFile(file: any): void {
    console.log("Downloading file:", file);
    const link = document.createElement("a");
    link.href = file.filePath;
    link.target = "_blank";
    link.download = file.filename || "default-filename";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }


}
