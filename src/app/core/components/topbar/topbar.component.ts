import { Component } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent {
  selectedOption: string = 'all'; // يمكنك تعيين القيمة الافتراضية كـ 'all' أو أي قيمة تناسبك

  onOptionChange(option: string) {
    this.selectedOption = option;
  }
}
