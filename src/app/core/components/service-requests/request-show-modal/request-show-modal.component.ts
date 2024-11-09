import { Component, Input, OnInit, SimpleChanges } from "@angular/core";
import { RequestResponseDto } from "../models/request-table.model";
import { HttpClient } from "@angular/common/http";
import { saveAs } from "file-saver";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ProposalService } from "../../providers-proposals/services/porposal.service";
import { ProposalResponse } from "../../providers-proposals/models/porposal-table.model";

@Component({
  selector: "app-request-show-modal",
  templateUrl: "./request-show-modal.component.html",
  styleUrls: ["./request-show-modal.component.css"],
})
export class RequestShowModalComponent implements OnInit {
  @Input() request?: RequestResponseDto;
  pricingPurpose: any;
  activeLink: string = "details";
  showFilePopup: boolean = false;
  proposalList: ProposalResponse[] = [];

  selectedFileUrl: SafeResourceUrl | null = null;
  constructor(private http: HttpClient, private sanitizer: DomSanitizer, private proposalService: ProposalService) { }


  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['request'] && this.request?.requestId) {
      this.getProposalsByRequestId(this.request.requestId);
    }
  }

  setActiveLink(link: string, event: Event) {
    event.preventDefault();
    this.activeLink = link;
  }

  getProposalsByRequestId(requestId: string | undefined) {
    if (requestId != undefined) {
      this.proposalService.getProposalsByRequestId(requestId).subscribe({
        next: (res: ProposalResponse[]) => {
          this.proposalList = res;
        },
        error: (e) => {
          console.log(e);
        }
      })
    }
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
    this.isImageFile = /\.(png|jpg|jpeg)$/.test(filePath + (this.isImageFile ? '' : '#toolbar=0'));
    this.selectedFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(filePath + (this.isImageFile ? '' : '#toolbar=0'));
    this.showFilePopup = true;
  }

}
