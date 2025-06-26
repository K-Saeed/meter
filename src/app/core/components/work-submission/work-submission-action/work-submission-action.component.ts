import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-work-submission-action',
  templateUrl: './work-submission-action.component.html',
  styleUrls: ['./work-submission-action.component.css']
})
export class WorkSubmissionActionComponent {
  currentLang: string = 'en';
  constructor(private translateService: TranslateService) {
    this.currentLang = this.translateService.currentLang;
  }
}
