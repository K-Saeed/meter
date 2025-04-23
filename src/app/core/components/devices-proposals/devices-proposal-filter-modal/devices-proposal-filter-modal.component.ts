import { ChangeDetectorRef, Component } from '@angular/core';
import { DevicesProposalService } from '../services/devices-porposal.service';

@Component({
  selector: 'app-devices-proposal-filter-modal',
  templateUrl: './devices-proposal-filter-modal.component.html',
  styleUrls: ['./devices-proposal-filter-modal.component.css']
})
export class DevicesProposalFilterModalComponent {
  activeLinks: string[] = [];
  activeStatus: string | null = null;
  constructor(
    private proposalService: DevicesProposalService,
    private cdr: ChangeDetectorRef
  ) {}

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
