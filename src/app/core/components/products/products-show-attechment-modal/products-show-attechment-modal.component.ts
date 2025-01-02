import { Component, Input } from '@angular/core';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-products-show-attechment-modal',
  templateUrl: './products-show-attechment-modal.component.html',
  styleUrls: ['./products-show-attechment-modal.component.css']
})
export class ProductsShowAttechmentModalComponent {
  @Input() product?: Product;
  fileNames: string[] = [];
  constructor() {}

  ngOnInit(): void {
    // if (this.product?.productImages) {
    //   this.extractFileNames(this.product.productLogo?.filePath);
    // }
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

}
