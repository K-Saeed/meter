import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Product } from "../models/product.model";
import { ProductService } from "../services/product.service";

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
  product?: Product;
  private statusSubscription!: Subscription;
  selectedProductId: number | undefined;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.statusSubscription = this.productService.status$.subscribe(status => {
      this.status = status!;
      this.getProductList();
    });
    this.getProductList();
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
        this.setPage(1, new Event(""));
      },
      (err) => {
        console.log(err);
      }
    );
  }
  setProductId(productId: number | undefined) {
    this.selectedProductId = productId;
    this.setProduct();
  }
  setProduct() {
    this.product = this.productList.find(product => product.productId === this.selectedProductId);

  }
}
