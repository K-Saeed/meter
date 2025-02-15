import { Component, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import Quill from 'quill';

@Component({
  selector: 'app-blogs-add',
  templateUrl: './blogs-add.component.html',
  styleUrls: ['./blogs-add.component.css']
})
export class BlogsAddComponent implements AfterViewInit {
  keywordsControl = new FormControl(''); // إدخال المستخدم
  keywords: string[] = [];
  filePreviews: (string | ArrayBuffer | null)[] = [];
  uploadedFiles: File[] = [];
  requestFiles: any[] = []; // Ensure requestFiles is declared
  maxFileSize = 25 * 1024 * 1024;
  quillEditor!: Quill;
  savedContent: string = '';

  ngAfterViewInit() {
    this.quillEditor = new Quill('#editor', {
      theme: 'snow',
      placeholder: 'Write here..',
      modules: {
        toolbar: [

          [{ 'font': [] }],
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
          ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
          ['blockquote', 'code-block'],
          ['link', 'image', 'video', 'formula'],

          // [{ 'header': 1 }, { 'header': 2 }],               // custom button values
          [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
          [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
          [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
          [{ 'direction': 'rtl' }],                         // text direction


          [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
          [{ 'align': [] }],

          ['clean']
        ]
      }
    });

    this.quillEditor.on('text-change', () => {
      this.savedContent = this.quillEditor.root.innerHTML;

    });
  }

  saveContent() {
    console.log('the content', this.savedContent);
  }
  private readonly typeMapping: { [key: string]: string } = {
    'image/': 'image',
    'application/octet-stream': 'image',
    'application/pdf': 'pdf',
    'text/': 'text',
    'video/': 'video',
    'audio/': 'audio',
    'application/vnd': 'document'
  };
  addKeyword(event: KeyboardEvent): void {
    const input = (event.target as HTMLInputElement).value.trim();
    if ((event.key === ',' || event.key === 'Enter') && input) {
      if (!this.keywords.includes(input)) {
        this.keywords.push(input);
      }
      this.keywordsControl.setValue('');
      event.preventDefault();
    }
  }

  removeKeyword(index: number): void {
    this.keywords.splice(index, 1);
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

  removeFileFromRequestFiles(fileToRemove: any) {
    this.requestFiles = this.requestFiles.filter(file => file !== fileToRemove);
  }

  getFileType(fileType: string): string {
    if (fileType.startsWith("image/")) {
      return "image";
    } else if (fileType === "application/pdf") {
      return "pdf";
    } else if (fileType.startsWith("text/")) {
      return "text";
    } else if (fileType.startsWith("application/vnd")) {
      return "document";
    } else {
      return "unknown";
    }
  }
  selectedRecipients: string[] = [];
  selectedVisibility: string = '';
  showDateInput: boolean = false;
  dropdownOpen = false;


  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
  closeDropdown(event: Event) {
    if (!(<Element>event.target).closest('.input-container')) {
      this.dropdownOpen = false;
    }
  }

  onRadioChange() {
    this.showDateInput = this.selectedVisibility === 'Scheduled';
  }
}



