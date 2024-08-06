import { Component } from "@angular/core";
import { Product } from "../models/product.model";
import { ProductService } from "../services/product.service";

@Component({
  selector: "app-products-table",
  templateUrl: "./products-table.component.html",
  styleUrls: ["./products-table.component.css"],
})
export class ProductsTableComponent {
  selectAll: boolean = false;

  productList!: Product[];

  currentPage: number = 1;
  itemsPerPage: number = 4;
  Math = Math;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProductList();
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


  getProductList(){
    this.productService.getProductList().subscribe(
      (res) => {
        this.productList = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
