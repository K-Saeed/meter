import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-filter-modal',
  templateUrl: './user-filter-modal.component.html',
  styleUrls: ['./user-filter-modal.component.css']
})
export class UserFilterModalComponent {
  activeLink: string = '';
  activeLinks: string[] = [];
  @ViewChild('minRange') minRangeRef!: ElementRef<HTMLInputElement>;
  @ViewChild('maxRange') maxRangeRef!: ElementRef<HTMLInputElement>;
  @ViewChild('sliderMinValue') minLabelRef!: ElementRef<HTMLElement>;
  @ViewChild('sliderMaxValue') maxLabelRef!: ElementRef<HTMLElement>;
  @ViewChild('rangeHighlight') rangeHighlightRef!: ElementRef<HTMLElement>;

  constructor(private userService: UserService) {}

  ngOnInit(): void {

  }
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
    return this.activeLinks.includes(link);
  }
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

    updateLabelsAndHighlight(); // التحديث الأولي للتسميات والخلفية
  }

  filter(): void {
    const choosenStatus = this.activeLinks[0];
    console.log(choosenStatus)
    this.userService.setStatus(choosenStatus)
  }

}
