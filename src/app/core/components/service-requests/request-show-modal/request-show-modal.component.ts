import { Component, Input } from "@angular/core";
import { RequestResponseDto } from "../models/request-table.model";
import { HttpClient } from "@angular/common/http";
import { saveAs } from "file-saver";

@Component({
  selector: "app-request-show-modal",
  templateUrl: "./request-show-modal.component.html",
  styleUrls: ["./request-show-modal.component.css"],
})
export class RequestShowModalComponent {
  @Input() request?: RequestResponseDto;

  activeLink: string = "details";
  constructor(private http: HttpClient) {}

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

}
