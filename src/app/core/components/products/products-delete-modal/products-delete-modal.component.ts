import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products-delete-modal',
  templateUrl: './products-delete-modal.component.html',
  styleUrls: ['./products-delete-modal.component.css']
})
export class ProductsDeleteModalComponent implements OnInit {
  @Input() product?: Product;

  constructor(private productServce: ProductService) {}

  ngOnInit(): void {

  }
  onDeleteProduct(productId: number | undefined): void {
    this.productServce.onDeleteProduct(productId);
  }

}
