import { Component, Input, OnInit } from '@angular/core';
import { RequestResponseDto } from '../../models/request-table.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormDataService } from '../form-data.service';

@Component({
  selector: 'app-job-modal',
  templateUrl: './job-modal.component.html',
  styleUrls: ['./job-modal.component.css']
})
export class JobModalComponent implements OnInit{
  getFormData() {
    throw new Error('Method not implemented.');
  }
  @Input () request?: RequestResponseDto;

  jobForm!: FormGroup;

  constructor(private formDataService: FormDataService) {}
  ngOnInit(): void {
    this.jobForm = new FormGroup({
      certificateType: new FormControl(this.request?.jobRequestDto?.certificateType || '', Validators.required),
      experiences: new FormControl(this.request?.jobRequestDto.experienceDesc || '', Validators.required),
      region: new FormControl(this.request?.jobRequestDto.workCity || '', Validators.required),
      neighborhood: new FormControl(this.request?.jobRequestDto.email || '', Validators.required),
      city: new FormControl(this.request?.jobRequestDto.workCity || '', Validators.required),
      specialization: new FormControl(this.request?.jobRequestDto.specialization || '', Validators.required),
      phoneNumber: new FormControl(this.request?.jobRequestDto.phoneNumber || '', Validators.required),
      email: new FormControl(this.request?.jobRequestDto.email || '', [Validators.required, Validators.email])
    });
  }

  saveData() {
    if (this.jobForm.valid) {
      this.formDataService.setFormData(1, this.jobForm.value);
    }
  }

  certificateDropdownOpen = false;
  selectedCertificate: string = '';
  specializationeDropdownOpen = false;
  selectedSpecialization: string = '';
  experiencesDropdownOpen = false;
  selectedExperiences: string = '';
  otherCertificate: string = '';
  phoneNumber: string = '+966';
  uploadedFiles: File[] = [];
  filePreviews: (string | ArrayBuffer | null)[] = [];
  maxFileSize = 25 * 1024 * 1024;

  certificateOptions  = [
    { name: 'University degree', selected: false },
    { name: 'Diploma', selected: false },
    { name: 'Other', selected: false }
  ];
  specializationOptions  = [
    { name: 'Surveying engineer', selected: false },
    { name: 'Structural engineer', selected: false },
    { name: 'Safety engineer', selected: false }
  ];
  experiencesOptions = [
    { name: 'Yes', selected: false },
    { name: 'No', selected: false },
  ];
  toggleCertificateDropdown() {
    this.certificateDropdownOpen = !this.certificateDropdownOpen;
  }
  toggleSpecializationDropdown() {
    this.specializationeDropdownOpen = !this.specializationeDropdownOpen;
  }
  toggleExperiencesDropdown() {
    this.experiencesDropdownOpen = !this.experiencesDropdownOpen;
  }
  onCertificateSelected(certificateName: string) {
    this.selectedCertificate = certificateName;
    this.certificateDropdownOpen = false;
  }
  onspecializationSelected() {
    this.specializationeDropdownOpen = false;
}
onExperiencesSelected() {
  this.experiencesDropdownOpen = false;
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
resizeImage(file: File, maxWidth: number, maxHeight: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      img.src = e.target?.result as string;
    };

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;

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

      resolve(canvas.toDataURL('image/jpeg'));
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
  return file !== null && file.type.startsWith('image/');
}
removeFile(index: number) {
  console.log('Before removing:', this.filePreviews, this.uploadedFiles);
  if (index >= 0 && index < this.filePreviews.length) {
      this.filePreviews.splice(index, 1);
      this.uploadedFiles.splice(index, 1);
  } else {
      console.log('Index out of bounds:', index);
  }
  console.log('After removing:', this.filePreviews, this.uploadedFiles);
}
}
