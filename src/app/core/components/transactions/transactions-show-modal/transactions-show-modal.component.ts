import { Component } from '@angular/core';

@Component({
  selector: 'app-transactions-show-modal',
  templateUrl: './transactions-show-modal.component.html',
  styleUrls: ['./transactions-show-modal.component.css']
})
export class TransactionsShowModalComponent {
  activeLink: string = 'details';

  setActiveLink(link: string, event: Event) {
    event.preventDefault();
    this.activeLink = link;
  }
}
