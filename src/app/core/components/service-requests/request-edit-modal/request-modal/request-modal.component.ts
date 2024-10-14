import { Component } from '@angular/core';

@Component({
  selector: 'app-request-modal',
  templateUrl: './request-modal.component.html',
  styleUrls: ['./request-modal.component.css']
})
export class RequestModalComponent {
  // dropdownOpen = false;
  pricingDropdownOpen = false;
  surveyDropdownOpen = false;
  certificateDropdownOpen = false;
  phoneNumber: string = '+966';

  selectedPricing: string = '';
  selectedSurvey: string = '';
  selectedCertificate: string = '';

  // selectedSurvey: string[] = [];
  pricingOptions = [
    { name: 'Survey report', selected: false },
    { name: 'Building compliance certificate', selected: false },
    { name: 'Construction completion certificate', selected: false },
    { name: 'Construction license', selected: false },
    { name: 'Correction the condition of an existing building', selected: false },
    { name: 'Occupancy certificate', selected: false },
    { name: 'Building conformity certificate', selected: false },
    { name: 'Design works', selected: false },
    { name: 'Safety works', selected: false },
    { name: 'Demolition permit', selected: false },
    { name: 'technical report', selected: false },
  ];
  surveyReport = [
    { name: 'Issuance of a building permit', selected: false },
    { name: 'For the purpose of issuing a permit for a wall', selected: false },
    { name: 'For the purpose of expropriation', selected: false },
    { name: 'For regulatory purposes', selected: false },
    { name: 'For the purpose of adding or merging parts', selected: false },
    { name: 'For the purpose of modifying lengths and area', selected: false },
    { name: 'For the purpose of vacating', selected: false },
    { name: 'For the purpose of drilling a well', selected: false },
    { name: 'For the purpose of a surveying report', selected: false },
    { name: ' For the purpose of requesting property unit subdivision', selected: false },
    { name: 'For the purpose of subdividing built-up land (duplex)', selected: false },
    { name: 'Subdivision of a planned residential plot', selected: false },
    { name: 'For the purpose of amending the plan details (plot, layout, and area)', selected: false },
    { name: 'For the purpose of modifying/updating ownership deed details', selected: false },
    { name: 'For the purpose of adding a street width', selected: false },
    { name: 'Allocation of a government location', selected: false },
    { name: 'For the purpose of a location statement', selected: false },
    { name: 'For the purpose of changing land use', selected: false },
    { name: 'Merging planned residential plots', selected: false },
    { name: 'For the purpose of merging unplanned (Unorganized) land plots', selected: false },
    { name: 'For the purpose of restoration', selected: false },
    { name: 'For the purpose of renovation', selected: false },
    { name: 'For the purpose of regulations', selected: false },
    { name: 'Clarification/Statement of public benefit for granted land', selected: false },
    { name: 'Clarification of granted land', selected: false },
    { name: 'Approval of a private plan', selected: false },
    { name: 'Issuance of a wall permit for vacant land', selected: false },
    { name: 'Clarification of an investment location', selected: false },
    { name: 'Allocation of an investment location', selected: false },
    { name: 'For the purpose of transferring ownership', selected: false },
    { name: 'For the purpose of demolition', selected: false },
    { name: 'For the purpose of a completion certificate', selected: false },
    { name: 'For the purpose of preparing or leveling land', selected: false },
    { name: 'For the purpose of rectifying the status of an existing building', selected: false },
    { name: 'Factory', selected: false },
  ];
  certificateOptions = [
    { name: 'Residential', selected: false },
    { name: 'Commercial', selected: false },
    { name: 'Industrial', selected: false },
    { name: 'Governmental', selected: false },
    { name: 'Investment', selected: false },
  ];
 
  togglePricingDropdown() {
    this.pricingDropdownOpen = !this.pricingDropdownOpen;
  }
  toggleCertificateDropdown() {
    this.certificateDropdownOpen = !this.certificateDropdownOpen;
  }
  toggleSurveyDropdown() {
    this.surveyDropdownOpen = !this.surveyDropdownOpen;
  }

  // updateSelectedSurvey() {
  //   console.log('Selected Survey:', this.selectedSurvey);
  // }
  onSurveySelected() {
    this.surveyDropdownOpen = false; 
    console.log('Selected Survey:', this.selectedSurvey);
  }

  updateSelectedPricing() {
    if (this.selectedPricing === 'Survey report') {
      this.surveyDropdownOpen = false;
    } else {
      this.surveyDropdownOpen = false;
    }
    this.pricingDropdownOpen = false;
  }
  onPricingSelected() {
    // console.log('Selected Pricing:', this.selectedPricing);
    this.pricingDropdownOpen = false;
  }

  showSurveyReportNumber(): boolean {
    return this.selectedPricing !== 'Survey report';
  }
  onCertificateSelected() {
    console.log(this.selectedCertificate);
    this.certificateDropdownOpen = false;
  }
  onPhoneInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.value.startsWith('+966')) {
      input.value = '+966';
    }
    if (input.value.length > 13) {
      input.value = input.value.slice(0, 13);
    }
    this.phoneNumber = input.value;
  }
}
