import { Component, Input } from "@angular/core";
import { Product } from "../models/product.model";
import { ProductCallService } from "src/app/shared/service/product-call.service";

@Component({
  selector: "app-products-approve-modal",
  templateUrl: "./products-approve-modal.component.html",
  styleUrls: ["./products-approve-modal.component.css"],
})
export class ProductsApproveModalComponent {
  @Input() product?: Product;
  message!: string;
  status: string = 'Approved';

  constructor(private productCallService: ProductCallService) {}

  ngOnInit(): void {}

  updateStatus() {
    if (!this.product?.productId) {
      this.message = "Request ID is required";
      return;
    }
    this.productCallService.updateProductStatus(this.product.productId, this.status)
      .subscribe(
        () => {
          this.message = "Status updated successfully";
          window.location.reload();
        },
        (error) => {
          this.message = "Error updating status";
          window.location.reload();
          console.error("Error:", error);
        }
      );
  }
}
