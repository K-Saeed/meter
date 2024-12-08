import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { RequestResponseDto } from "../models/request-table.model";
import { HttpClient } from "@angular/common/http";
import { saveAs } from "file-saver";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { ProposalResponse } from "../../providers-proposals/models/porposal-table.model";
import { ProposalCallService } from "src/app/shared/service/proposal-call.service";

@Component({
  selector: "app-request-show-modal",
  templateUrl: "./request-show-modal.component.html",
  styleUrls: ["./request-show-modal.component.css"],
})
export class RequestShowModalComponent implements OnInit, OnChanges {
  selectedProposal: string | null = null;
  @Input() request?: RequestResponseDto;
  pricingPurpose: any;
  activeLink: string = "details";
  showFilePopup: boolean = false;
  offers: ProposalResponse[] = [];
  selectedFileUrl: SafeResourceUrl | null = null;
  isImageFile: boolean = false;

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private proposalCallService: ProposalCallService
  ) {}

  ngOnInit(): void {
    if (this.request?.requestId) {
      this.loadProposals();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['request'] && this.request?.requestId) {
      this.loadProposals();
    }
  }

  setActiveLink(link: string, event: Event) {
    event.preventDefault();
    this.activeLink = link;
  }

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

  showDetails(proposalId: string): void {
    this.selectedProposal =
      this.selectedProposal === proposalId ? null : proposalId;
  }

  loadProposals(): void {
    this.proposalCallService
      .getAllPorposalsForRequest(this.request?.requestId)
      .subscribe({
        next: (proposals) => {
          this.offers = proposals;
        },
        error: (err) => {
          console.error("Failed to load proposals:", err);
        },
      });
  }
}
