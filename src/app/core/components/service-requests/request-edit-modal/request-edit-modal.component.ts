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
import { FileResponse } from "../models/file-response";
import { RequestService } from "../services/request.service";
import { UpdateConsultationRequestDto, UpdateJobRequestDto, UpdateRequestDto, UpdateRequestServiceDto } from "../models/update-request-dto.model";

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

  requestFiles: FileResponse[] = [];
  filesTobeDeleted: string[] = [];

  private readonly typeMapping: { [key: string]: string } = {
    'image/': 'image',
    'application/octet-stream': 'image',
    'application/pdf': 'pdf',
    'text/': 'text',
    'video/': 'video',
    'audio/': 'audio',
    'application/vnd': 'document'
  };


  // @ViewChild('editModal') editModal!: ElementRef;

  constructor(
    private formDataService: FormDataService,
    private cdr: ChangeDetectorRef,
    private requestService: RequestService
  ) { }

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
      // console.log(this.uploadedFiles);
      
      // console.log(this.request);
      // console.log(this.request?.type);
      
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

      this.requestFiles = Array.from(this.request?.requestFiles || [])

      this.filesTobeDeleted = [];
      this.uploadedFiles = [];
      this.filePreviews = [];

      this.cdr.detectChanges();
    }
  }

  getGroup(groupName: string): FormGroup {
    return this.editForm.get(groupName) as FormGroup;
  }

  getControl(controlName: string) {
    return this.editForm.get(controlName);
  }

  getNestedControl(group: string, control: string) {
    return this.getGroup(group).get(control);
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

    /*if (this.editForm.invalid) {
      alert("Please complete all required fields");
      return;
    }*/
    /*      const formData = {
            ...this.editForm.value,
            jobData: this.jobModalComponent?.getFormData(),
            consolationData: this.consolationModalComponent?.getFormData(),
            // requestServiceData: this.requestModalComponent?.getFormData(),
          };
      
          this.formDataService.updateRequest(formData).subscribe(
            (response) => console.log("Request updated successfully!", response),
            (error) => console.error("Error updating request:", error)
          );*/

    const formData = new FormData();

    const updatedRequest = new UpdateRequestDto({
      // requestType: this.getControl('type')?.value,
      title: this.getControl('title')?.value,
      description: this.getControl('description')?.value,
      filesToBeDeletedIds: this.filesTobeDeleted,

      consultationRequestDto: this.request?.type === 'Consolation'? new UpdateConsultationRequestDto({
        type: this.getNestedControl('consolation', 'consolationType')?.value,
        applicationName: this.getNestedControl('consolation', 'applicantName')?.value,
        phoneNumber: this.getControl('phoneNumber')?.value,
        city: this.getControl('city')?.value,
        region:this.getControl('region')?.value,
        neighborhood: this.getControl('neighborhood')?.value,
      }):undefined,

      jobRequestDto:this.request?.type === 'Engineering Job'? new UpdateJobRequestDto({
        certificateType: this.getNestedControl('job', 'certificateType')?.value,
        specialization: this.getNestedControl('job', 'specialization')?.value,
        experienceYears: this.getNestedControl('job', 'experiences')?.value,
        experienceDesc: this.getNestedControl('job', 'experiences')?.value,
        workCity: this.getNestedControl('job', 'city')?.value,
        email: this.getNestedControl('job', 'email')?.value,
        name: this.getNestedControl('job', 'name')?.value,
        phoneNumber: this.getControl('phoneNumber')?.value,
      }):undefined,

      requestServiceDto:this.request?.type === 'Request Service'? new UpdateRequestServiceDto({
        pricingPurpose: this.getNestedControl('request', 'pricing')?.value,
        certificateType: this.getNestedControl('request', 'certificateType')?.value,
        surveyReportNum: this.getNestedControl('request', 'surveyReportNumber')?.value,
        city: this.getControl('city')?.value,
        pieceNum: this.getNestedControl('request', 'pieceNumber')?.value,
        chartNum: this.getNestedControl('request', 'chartNumber')?.value,
        applicationName: this.getNestedControl('request', 'applicantName')?.value,
        agencyNum: this.getNestedControl('request', 'agencyNumber')?.value,
        idNumber: this.getNestedControl('request', 'id')?.value,
        phoneNumber: this.getControl('phoneNumber')?.value,
        region:this.getControl('region')?.value,
      }):undefined,
    });

    // console.log(updatedRequest);
    

    formData.append(
      'updateRequestDto',
      new Blob([JSON.stringify(updatedRequest)], { type: 'application/json' })
    );

    if (this.uploadedFiles && this.uploadedFiles.length > 0) {
      this.uploadedFiles.forEach((file) => {
        formData.append(`request-files`, file, file.name);
      });
    }
    this.requestService.updateRequest(this.request?.requestId || "", formData)
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
        // console.log(this.filePreviews);

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

  removeFileFromRequestFiles(file: FileResponse) {
    const index: number = this.requestFiles.indexOf(file);
    if (index !== -1) {
      this.requestFiles.splice(index, 1);
      this.filesTobeDeleted.push(file.id)
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


  getFileType(mimeType: string): string {
    for (const [key, value] of Object.entries(this.typeMapping)) {
      if (mimeType.startsWith(key)) {
        return value;
      }
    }
    return 'unknown';
  }

}
