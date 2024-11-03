import { Component, Input, OnInit } from "@angular/core";
import { RequestResponseDto } from "../models/request-table.model";
import { HttpClient } from "@angular/common/http";
import { saveAs } from "file-saver";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: "app-request-show-modal",
  templateUrl: "./request-show-modal.component.html",
  styleUrls: ["./request-show-modal.component.css"],
})
export class RequestShowModalComponent  implements OnInit{
  @Input() request?: RequestResponseDto;
  pricingPurpose: any;
  activeLink: string = "details";
  showFilePopup: boolean = false;
selectedFileUrl: SafeResourceUrl | null = null;
  constructor(private http: HttpClient,private sanitizer: DomSanitizer) {}


  ngOnInit(): void {

  }

  setActiveLink(link: string, event: Event) {
    event.preventDefault();
    this.activeLink = link;
  }

  downloadFile(file: any): void {
    const link = document.createElement("a");
    link.href = file.filePath;
    link.target = '_blank'; // Opens the link in a new tab
    link.download = file.filename || 'default-filename'; // Optionally suggest a filename for download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  closePopup() {
    this.showFilePopup = false;
    this.selectedFileUrl = null;
  }
  isImageFile: boolean = false;

  openFileInPopup(file: any) {
    const filePath = file.filePath;
    this.isImageFile = /\.(png|jpg|jpeg)$/.test(filePath+ (this.isImageFile ? '' : '#toolbar=0'));
    this.selectedFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(filePath + (this.isImageFile ? '' : '#toolbar=0'));
    this.showFilePopup = true;
  }

}
