import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { RequestResponseDto } from "../models/request-table.model";
import { FormDataService } from "./form-data.service";
import { JobModalComponent } from "./job-modal/job-modal.component";
import { ConsolationModalComponent } from "./consolation-modal/consolation-modal.component";
import { RequestModalComponent } from "./request-modal/request-modal.component";

declare var bootstrap: any;

@Component({
  selector: "app-request-edit-modal",
  templateUrl: "./request-edit-modal.component.html",
  styleUrls: ["./request-edit-modal.component.css"],
})
export class RequestEditModalComponent implements OnInit, OnChanges {
  @ViewChild(JobModalComponent) jobModalComponent!: JobModalComponent;
  @ViewChild(ConsolationModalComponent)
  consolationModalComponent!: ConsolationModalComponent;
  @ViewChild(RequestModalComponent)
  requestModalComponent!: RequestModalComponent;

  uploadedFiles: File[] = [];
  phoneNumber: string = "+966";
  filePreviews: (string | ArrayBuffer | null)[] = [];
  maxFileSize = 25 * 1024 * 1024;
  @Input() request?: RequestResponseDto;
  editForm!: FormGroup;

  // @ViewChild('editModal') editModal!: ElementRef;

  constructor(
    private formDataService: FormDataService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.editForm = new FormGroup({
      type: new FormControl(""),
      title: new FormControl(""),
      neighborhood: new FormControl(""),
      region: new FormControl(""),
      city: new FormControl(""),
      phoneNumber: new FormControl(this.phoneNumber),
      location: new FormControl(""),
      description: new FormControl(""),
      pricing: new FormControl(""),
      pieceNumber: new FormControl(""),
      applicantName: new FormControl(""),
      surveyReportNumber: new FormControl(""),
      chartNumber: new FormControl(""),
      agencyNumber: new FormControl(""),
      id: new FormControl(""),
      request: new FormGroup({
        pricing: new FormControl(""),
        pieceNumber: new FormControl(""),
        applicantName: new FormControl(""),
        surveyReportNumber: new FormControl(""),
        chartNumber: new FormControl(""),
        agencyNumber: new FormControl(""),
        id: new FormControl(""),
        surveyPurpose: new FormControl(""),
        certificateType: new FormControl(""),
        city: new FormControl(""),
      }),
      job: new FormGroup({
        certificateType: new FormControl("", Validators.required),
        experiences: new FormControl("", Validators.required),
        region: new FormControl("", Validators.required),
        neighborhood: new FormControl("", Validators.required),
        city: new FormControl("", Validators.required),
        specialization: new FormControl("", Validators.required),
        phoneNumber: new FormControl("", Validators.required),
        email: new FormControl("", [Validators.required, Validators.email]),
        name: new FormControl("", [Validators.required]),
      }),
      consolation: new FormGroup({
        consolationType: new FormControl("", Validators.required),
        applicantName: new FormControl("", Validators.required),
      }),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["request"] && this.request) {
      this.populateForm();
      this.openModal();
    }
  }

  populateForm(): void {
    if (this.request) {
      this.editForm.patchValue({
        type: this.request.type,
        title: this.request.title,
        neighborhood:
          this.request?.requestServiceDto?.city ||
          this.request?.consultationRequestDto?.neighborhood ||
          this.request?.jobRequestDto?.workCity,
        region:
          this.request?.requestServiceDto?.city ||
          this.request?.consultationRequestDto?.region ||
          this.request?.jobRequestDto?.workCity,
        city:
          this.request?.requestServiceDto?.city ||
          this.request?.consultationRequestDto?.city ||
          this.request?.jobRequestDto?.workCity,
        phoneNumber:
          this.request.requestServiceDto?.phoneNumber ||
          this.request.consultationRequestDto?.phoneNumber ||
          this.request.jobRequestDto?.phoneNumber ||
          this.phoneNumber,
        description: this.request.description,
      });

      if (this.shouldDisableControl(this.request.type)) {
        this.editForm.controls["type"].disable();
      } else {
        this.editForm.controls["type"].enable();
      }

      this.cdr.detectChanges();
    }
  }

  openModal() {
    // // const modalElement = new bootstrap.Modal(this.editModal.nativeElement);
    // modalElement.show();
    this.cdr.detectChanges();
  }

  shouldDisableControl(type: string | undefined): boolean {
    return type === "Engineering Job";
  }

  onSubmit() {
    if (this.editForm.invalid) {
      alert("Please complete all required fields");
      return;
    }

    const formData = {
      ...this.editForm.value,
      jobData: this.jobModalComponent?.getFormData(),
      consolationData: this.consolationModalComponent?.getFormData(),
      // requestServiceData: this.requestModalComponent?.getFormData(),
    };

    this.formDataService.updateRequest(formData).subscribe(
      (response) => console.log("Request updated successfully!", response),
      (error) => console.error("Error updating request:", error)
    );
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
        if (this.isImageFile(file)) {
          const reader = new FileReader();
          reader.onload = (e: ProgressEvent<FileReader>) => {
            if (e.target && e.target.result) {
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
    if (index >= 0 && index < this.filePreviews.length) {
      this.filePreviews.splice(index, 1);
      this.uploadedFiles.splice(index, 1);
    }
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
    this.editForm.controls["phoneNumber"].setValue(this.phoneNumber);
  }
}
