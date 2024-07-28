import { Component } from '@angular/core';

@Component({
  selector: 'app-products-show-modal',
  templateUrl: './products-show-modal.component.html',
  styleUrls: ['./products-show-modal.component.css']
})
export class ProductsShowModalComponent {
  activeLink: string = 'details';

  setActiveLink(link: string, event: Event) {
    event.preventDefault();
    this.activeLink = link;
  }
}
