import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { TransactionService } from 'src/app/shared/service/transaction-call.service';

@Component({
  selector: 'app-transactions-filter-modal',
  templateUrl: './transactions-filter-modal.component.html',
  styleUrls: ['./transactions-filter-modal.component.css']
})
export class TransactionsFilterModalComponent {
  activeLink: string = '';
  activeLinks: string[] = [];
  activeStatus: string | null = null;

  @ViewChild('minRange') minRangeRef!: ElementRef<HTMLInputElement>;
  @ViewChild('maxRange') maxRangeRef!: ElementRef<HTMLInputElement>;
  @ViewChild('sliderMinValue') minLabelRef!: ElementRef<HTMLElement>;
  @ViewChild('sliderMaxValue') maxLabelRef!: ElementRef<HTMLElement>;
  @ViewChild('rangeHighlight') rangeHighlightRef!: ElementRef<HTMLElement>;

  constructor(private transactionService: TransactionService) {}

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
  // isActiveLink(link: string): boolean {
  //   return this.activeLinks.includes(link);
  // }
  ngAfterViewInit(): void {
    const minRange = this.minRangeRef.nativeElement;
    const maxRange = this.maxRangeRef.nativeElement;
    const minLabel = this.minLabelRef.nativeElement;
    const maxLabel = this.maxLabelRef.nativeElement;
    const rangeHighlight = this.rangeHighlightRef.nativeElement;

    const updateLabelsAndHighlight = () => {
      const minVal = parseInt(minRange.value, 10);
      const maxVal = parseInt(maxRange.value, 10);
      minLabel.textContent = `$${minVal}`;
      maxLabel.textContent = `$${maxVal}`;

      const minPercent = ((minVal - parseInt(minRange.min, 10)) / (parseInt(minRange.max, 10) - parseInt(minRange.min, 10))) * 100;
      const maxPercent = ((maxVal - parseInt(maxRange.min, 10)) / (parseInt(maxRange.max, 10) - parseInt(minRange.min, 10))) * 100;

      rangeHighlight.style.left = `${minPercent}%`;
      rangeHighlight.style.width = `${maxPercent - minPercent}%`;
    };

    minRange.addEventListener('input', () => {
      if (parseInt(minRange.value, 10) > parseInt(maxRange.value, 10)) {
        minRange.value = maxRange.value;
      }
      updateLabelsAndHighlight();
    });

    maxRange.addEventListener('input', () => {
      if (parseInt(maxRange.value, 10) < parseInt(minRange.value, 10)) {
        maxRange.value = minRange.value;
      }
      updateLabelsAndHighlight();
    });

    updateLabelsAndHighlight();
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
      this.transactionService.setStatus(status);
    } else {
      this.transactionService.setStatus('');
    }
  }
}
