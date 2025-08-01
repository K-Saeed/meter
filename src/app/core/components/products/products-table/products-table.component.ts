import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Product } from "../models/product.model";
import { ProductService } from "../services/product.service";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: "app-products-table",
  templateUrl: "./products-table.component.html",
  styleUrls: ["./products-table.component.css"],
})
export class ProductsTableComponent implements OnInit, OnDestroy {
  selectAll: boolean = false;
  productList: Product[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 4;
  Math = Math;
  status!: string;
  totalPages: number = 1;
  product?: Product;
  private statusSubscription!: Subscription;
  selectedProductId: string | undefined;
  currentLang: string = 'en';

  constructor(private productService: ProductService, private translateService: TranslateService) {
    this.currentLang = this.translateService.currentLang;
    this.translateService.onLangChange.subscribe((lang) => {
      this.currentLang = lang.lang;
    });
  }

  ngOnInit(): void {
    this.statusSubscription = this.productService.status$.subscribe(status => {
      this.status = status!;
      this.getProductList();
    });
  }

  ngOnDestroy(): void {
    if (this.statusSubscription) {
      this.statusSubscription.unsubscribe();
    }
  }

  toggleAll(event: Event) {
    event.preventDefault();
    this.productList.forEach((product) => (product.selected = this.selectAll));
  }

  checkIfAllSelected() {
    this.selectAll = this.productList.every((product) => product.selected);
  }

  get paginatedProducts() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.productList.slice(start, end);
  }

  setPage(page: number, event: Event) {
    event.preventDefault();
    this.currentPage = page;
  }

  getProductList() {
    this.productService.getProductList(this.status).subscribe(
      (res) => {
        this.productList = res;
        this.totalPages = Math.ceil(this.productList.length / this.itemsPerPage);
        this.setPage(1, new Event("")); // Optionally reset page to 1
      },
      (err) => {
        console.log(err);
      }
    );
  }

  setProductId(productId: string | undefined) {
    this.selectedProductId = productId;
    this.setProduct();
  }

  setProduct() {
    this.product = this.productList.find(product => product.productId === this.selectedProductId);
  }

  getPagination(): number[] {
    const maxVisiblePages = 4;
    const pagination: number[] = [];

    if (this.totalPages <= maxVisiblePages + 1) {
      for (let i = 1; i <= this.totalPages; i++) {
        pagination.push(i);
      }
    } else {
      if (this.currentPage <= 3) {
        for (let i = 1; i <= Math.min(maxVisiblePages, this.totalPages); i++) {
          pagination.push(i);
        }
        if (this.totalPages > maxVisiblePages) {
          pagination.push(-1);
          pagination.push(this.totalPages);
        }
      } else if (this.currentPage > this.totalPages - 3) {
        pagination.push(1);
        pagination.push(-1);
        for (let i = this.totalPages - maxVisiblePages + 1; i <= this.totalPages; i++) {
          pagination.push(i);
        }
      } else {
        pagination.push(1);
        pagination.push(-1);
        pagination.push(this.currentPage - 1);
        pagination.push(this.currentPage);
        pagination.push(this.currentPage + 1);
        pagination.push(-1);
        pagination.push(this.totalPages);
      }
    }
    return pagination;
  }
}
