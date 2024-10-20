import { Component, Input, OnInit, OnChanges, SimpleChanges, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RequestResponseDto } from '../models/request-table.model';
import { FormDataService } from './form-data.service';

declare var bootstrap: any; // Declaring the global `bootstrap` variable

@Component({
  selector: 'app-request-edit-modal',
  templateUrl: './request-edit-modal.component.html',
  styleUrls: ['./request-edit-modal.component.css']
})
export class RequestEditModalComponent implements OnInit, OnChanges {
  uploadedFiles: File[] = [];
  phoneNumber: string = '+966';
  filePreviews: (string | ArrayBuffer | null)[] = [];
  maxFileSize = 25 * 1024 * 1024;
  @Input() request?: RequestResponseDto;
  editForm!: FormGroup;

  @ViewChild('editModal') editModal!: ElementRef; // Reference to the modal element

  constructor(private formDataService: FormDataService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.editForm = new FormGroup({
      type: new FormControl(''),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['request'] && this.request) {
      this.editForm.controls['type'].setValue(this.request.type || '');

      if (this.shouldDisableControl(this.request.type)) {
        this.editForm.controls['type'].disable();
      } else {
        this.editForm.controls['type'].enable();
      }

      // Manually trigger change detection after form updates
      this.cdr.detectChanges();

      // Trigger modal opening based on the type
      this.openModal();
    }
  }

  openModal() {
    const modalElement = new bootstrap.Modal(this.editModal.nativeElement); // Use bootstrap.Modal to open the modal
    modalElement.show();

    // Manually trigger change detection after opening the modal
    this.cdr.detectChanges();
  }

  shouldDisableControl(type: string | undefined): boolean {
    return type === 'Engineering Job';
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
