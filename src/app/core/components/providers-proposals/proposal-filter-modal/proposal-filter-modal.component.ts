import { ChangeDetectorRef, Component } from '@angular/core';
import { ProposalService } from '../services/porposal.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-proposal-filter-modal',
  templateUrl: './proposal-filter-modal.component.html',
  styleUrls: ['./proposal-filter-modal.component.css']
})
export class ProposalFilterModalComponent {
  activeLinks: string[] = [];
  activeStatus: string | null = null;
  constructor(
    private proposalService: ProposalService,
    private cdr: ChangeDetectorRef,
    public translateService: TranslateService

  ) { }

  toggleLink(link: string, event: Event): void {
    event.preventDefault();
    if (this.activeLinks.includes(link)) {
      this.activeLinks = this.activeLinks.filter(l => l !== link);
    } else {
      this.activeLinks.push(link);
    }
  }

  clearLink(link: string, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.activeLinks = this.activeLinks.filter(l => l !== link);
  }
  isActiveLink(link: string): boolean {
    return this.activeStatus === link;
  }

  toggleStatus(status: string, event: Event): void {
    event.preventDefault();
    if (this.activeStatus === status) {
      this.activeStatus = null;
    } else {
      this.activeStatus = status;
    }
  }


  isActiveStatus(status: string): boolean {
    return this.activeStatus === status;
  }

  filter(): void {
    const status = this.activeStatus;

    if (status) {
      this.proposalService.setStatus(status);
    } else {
      this.proposalService.setStatus('');
    }
  }



}
