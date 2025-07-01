import { Component } from "@angular/core";
import { ProductService } from "../services/product.service";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: "app-products-filter-modal",
  templateUrl: "./products-filter-modal.component.html",
  styleUrls: ["./products-filter-modal.component.css"],
})
export class ProductsFilterModalComponent {

  activeLinks: string[] = [];

  constructor(private productService: ProductService,
    public translateService: TranslateService

  ) { }

  toggleLink(link: string, event: Event): void {
    event.preventDefault();
    if (this.activeLinks.includes(link)) {
      this.activeLinks = this.activeLinks.filter((l) => l !== link);
    } else {
      this.activeLinks = [];
      this.activeLinks.push(link);
    }
  }

  clearLink(link: string, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.activeLinks = this.activeLinks.filter((l) => l !== link);
    if (this.activeLinks[0] == null) {
      this.productService.setStatus(null)
    }
  }

  isActiveLink(link: string): boolean {
    return this.activeLinks.includes(link);
  }

  filter(): void {
    const choosenStatus = this.activeLinks[0];
    console.log(choosenStatus)
    this.productService.setStatus(choosenStatus)
  }
}
