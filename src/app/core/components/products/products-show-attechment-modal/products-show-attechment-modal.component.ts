import { Component, Input } from '@angular/core';
import { Product } from '../models/product.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-products-show-attechment-modal',
  templateUrl: './products-show-attechment-modal.component.html',
  styleUrls: ['./products-show-attechment-modal.component.css']
})
export class ProductsShowAttechmentModalComponent {
  @Input() product?: Product;
  fileNames: string[] = [];
  selectedFileUrl: SafeResourceUrl | null = null;
  showFilePopup: boolean = false;
  isImageFile: boolean = false;
  constructor(
    private sanitizer: DomSanitizer,
  ) { }



  closePopup() {
    this.showFilePopup = false;
    this.selectedFileUrl = null;
  }

  openFileInPopup(file: any) {
    console.log("File clicked:", file);
    const filePath = file.filePath;
    this.isImageFile = /\.(png|jpg|jpeg)$/.test(filePath);
    const safeUrl = filePath + (this.isImageFile ? "" : "#toolbar=0");
    console.log("Safe URL:", safeUrl);
    this.selectedFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(safeUrl);
    this.showFilePopup = true;
  }

  extractFileNames(urls: string[]): void {
    this.fileNames = urls.flatMap(url => {
      const urlParts = url.split(',');
      return urlParts.map(part => {
        const segments = part.split('/');
        return segments[segments.length - 1];
      });
    });
  }

  downloadFile(file: any): void {
    console.log("Downloading file:", file);
    const link = document.createElement("a");
    link.href = file.filePath;
    link.target = "_blank";
    link.download = file.filename || "default-filename";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

}
