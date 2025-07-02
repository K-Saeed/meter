import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { RequestServiceDto } from "../../models/request-service-dto.model";
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: "app-request-modal",
  templateUrl: "./request-modal.component.html",
  styleUrls: ["./request-modal.component.css"],
})
export class RequestModalComponent implements OnInit {
  @Input() requestService?: RequestServiceDto;
  @Input() form?: FormGroup;
  formGroup!: FormGroup;
  currentLang = this.translateService.currentLang;

  // dropdownOpen = false;
  pricingDropdownOpen = false;
  surveyDropdownOpen = false;
  certificateDropdownOpen = false;
  applicantDropdownOpen = false;
  phoneNumber: string = "+966";

  selectedPricing: string = "";
  selectedSurvey: string = "";
  selectedCertificate: string = "";
  selectedApplicant: string = "";
  uploadedFiles: File[] = [];
  filePreviews: (string | ArrayBuffer | null)[] = [];
  maxFileSize = 25 * 1024 * 1024;
  ngOnInit(): void {
    this.initForm();
    this.populateForm();
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['request'] && this.request) {
  //     this.populateForm();
  //   }
  // }
  constructor(
    public translateService: TranslateService

  ) { }
  initForm(): void {
    this.formGroup = this.form?.get('request') as FormGroup<any>;
  }

  populateForm(): void {
    if (this.requestService) {
      this.selectedPricing = this.requestService.pricingPurpose;
      this.selectedSurvey = this.requestService.surveyReport;
      this.selectedApplicant = this.requestService.applicationType;
      this.selectedCertificate = this.requestService.certificateType;

      this.form?.patchValue({
        request: {
          pieceNumber: this.requestService.pieceNum,
          applicantName: this.requestService.applicationName,
          applicantType: this.requestService.applicationType,
          surveyReportNumber: this.requestService.surveyReportNum,
          chartNumber: this.requestService.chartNum,
          agencyNumber: this.requestService.idNumber,
          id: this.requestService.idNumber,
          pricing: this.requestService.pricingPurpose,
          surveyPurpose: this.requestService.surveyReport,
          certificateType: this.requestService.certificateType,
          city: this.requestService.city
        },
      });
    }
  }
  // getFormData() {
  //   return this.parentForm.value;
  // }
  // selectedSurvey: string[] = [];
  pricingOptions = [
    { name: "Survey report", selected: false },
    { name: "Building compliance certificate", selected: false },
    { name: "Construction completion certificate", selected: false },
    { name: "Construction license", selected: false },
    {
      name: "Correction the condition of an existing building",
      selected: false,
    },
    { name: "Occupancy certificate", selected: false },
    { name: "Building conformity certificate", selected: false },
    { name: "Design works", selected: false },
    { name: "Safety works", selected: false },
    { name: "Demolition permit", selected: false },
    { name: "technical report", selected: false },
  ];
  surveyReport = [
    { name: "Issuance of a building permit", selected: false },
    { name: "For the purpose of issuing a permit for a wall", selected: false },
    { name: "For the purpose of expropriation", selected: false },
    { name: "For regulatory purposes", selected: false },
    { name: "For the purpose of adding or merging parts", selected: false },
    { name: "For the purpose of modifying lengths and area", selected: false },
    { name: "For the purpose of vacating", selected: false },
    { name: "For the purpose of drilling a well", selected: false },
    { name: "For the purpose of a surveying report", selected: false },
    {
      name: " For the purpose of requesting property unit subdivision",
      selected: false,
    },
    {
      name: "For the purpose of subdividing built-up land (duplex)",
      selected: false,
    },
    { name: "Subdivision of a planned residential plot", selected: false },
    {
      name: "For the purpose of amending the plan details (plot, layout, and area)",
      selected: false,
    },
    {
      name: "For the purpose of modifying/updating ownership deed details",
      selected: false,
    },
    { name: "For the purpose of adding a street width", selected: false },
    { name: "Allocation of a government location", selected: false },
    { name: "For the purpose of a location statement", selected: false },
    { name: "For the purpose of changing land use", selected: false },
    { name: "Merging planned residential plots", selected: false },
    {
      name: "For the purpose of merging unplanned (Unorganized) land plots",
      selected: false,
    },
    { name: "For the purpose of restoration", selected: false },
    { name: "For the purpose of renovation", selected: false },
    { name: "For the purpose of regulations", selected: false },
    {
      name: "Clarification/Statement of public benefit for granted land",
      selected: false,
    },
    { name: "Clarification of granted land", selected: false },
    { name: "Approval of a private plan", selected: false },
    { name: "Issuance of a wall permit for vacant land", selected: false },
    { name: "Clarification of an investment location", selected: false },
    { name: "Allocation of an investment location", selected: false },
    { name: "For the purpose of transferring ownership", selected: false },
    { name: "For the purpose of demolition", selected: false },
    { name: "For the purpose of a completion certificate", selected: false },
    { name: "For the purpose of preparing or leveling land", selected: false },
    {
      name: "For the purpose of rectifying the status of an existing building",
      selected: false,
    },
    { name: "Factory", selected: false },
  ];
  certificateOptions = [
    { name: "Residential", selected: false },
    { name: "Commercial", selected: false },
    { name: "Industrial", selected: false },
    { name: "Governmental", selected: false },
    { name: "Investment", selected: false },
  ];
  applicantOptions = [
    { name: "Owner", selected: false },
    { name: "Dealer", selected: false },
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

  onSurveySelected(value: string) {
    this.selectedSurvey = value;
    this.surveyDropdownOpen = false;
    this.form?.patchValue({
      request: {
        surveyPurpose: value,
      },
    });
  }

  updateSelectedPricing() {
    if (this.selectedPricing === "Survey report") {
      this.surveyDropdownOpen = false;
    } else {
      this.surveyDropdownOpen = false;
    }
    this.pricingDropdownOpen = false;
  }

  onPricingSelected(value: string) {
    this.selectedPricing = value;
    this.pricingDropdownOpen = false;
    this.form?.patchValue({
      request: {
        pricing: value,
      },
    });
  }
  toggleApplicantDropdown() {
    this.applicantDropdownOpen = !this.applicantDropdownOpen;
  }

  onApplicantSelected(value: string) {
    this.selectedApplicant = value;
    this.applicantDropdownOpen = false;
    this.form?.patchValue({
      request: {
        applicantType: value,
      },
    });
  }

  showSurveyReportNumber(): boolean {
    return this.selectedPricing !== "Survey report";
  }

  onCertificateSelected(value: string) {
    this.selectedCertificate = value;
    this.certificateDropdownOpen = false;
    this.form?.patchValue({
      request: {
        certificateType: value,
      },
    });
  }
  onPhoneInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.value.startsWith("+966")) {
      input.value = "+966";
    }
    if (input.value.length > 13) {
      input.value = input.value.slice(0, 13);
    }
    this.phoneNumber = input.value;
  }

  resizeImage(
    file: File,
    maxWidth: number,
    maxHeight: number
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        img.src = e.target?.result as string;
      };

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d")!;

        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = height * (maxWidth / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = width * (maxHeight / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        resolve(canvas.toDataURL("image/jpeg"));
      };

      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  onFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const files = Array.from(input.files);

      for (const file of files) {
        if (file.size > this.maxFileSize) {
          alert(`File ${file.name} exceeds the maximum file size of 25MB.`);
          continue;
        }

        this.uploadedFiles.push(file);

        // Check if the file is an image
        if (this.isImageFile(file)) {
          const reader = new FileReader();
          reader.onload = (e: ProgressEvent<FileReader>) => {
            if (e.target && e.target.result) {
              // Push the image preview to the filePreviews array
              this.filePreviews.push(e.target.result as string);
            }
          };
          reader.readAsDataURL(file);
        } else {
          this.filePreviews.push(file.name);
        }
      }
    }
  }
  isImageFile(file: File | null): boolean {
    return file !== null && file.type.startsWith("image/");
  }
  removeFile(index: number) {
    console.log("Before removing:", this.filePreviews, this.uploadedFiles);
    if (index >= 0 && index < this.filePreviews.length) {
      this.filePreviews.splice(index, 1);
      this.uploadedFiles.splice(index, 1);
    } else {
      console.log("Index out of bounds:", index);
    }
    console.log("After removing:", this.filePreviews, this.uploadedFiles);
  }
}
