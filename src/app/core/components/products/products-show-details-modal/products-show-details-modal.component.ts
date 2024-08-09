import { Component, Input } from '@angular/core';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-products-show-details-modal',
  templateUrl: './products-show-details-modal.component.html',
  styleUrls: ['./products-show-details-modal.component.css']
})
export class ProductsShowDetailsModalComponent {
  @Input() product?: Product;
  constructor() {}

  ngOnInit(): void {

  }

}
