import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-products-show-modal',
  templateUrl: './products-show-modal.component.html',
  styleUrls: ['./products-show-modal.component.css']
})
export class ProductsShowModalComponent implements OnInit {
  @Input() product?: Product;

  constructor() {}

  ngOnInit(): void {

  }

  activeLink: string = 'details';

  setActiveLink(link: string, event: Event) {
    event.preventDefault();
    this.activeLink = link;
  }
}
