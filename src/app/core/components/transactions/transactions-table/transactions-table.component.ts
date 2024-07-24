import { Component } from '@angular/core';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.css']
})
export class TransactionsTableComponent {
  selectAll: boolean = false;
  users = [
    { id: '20', providerName: 'Mohamede MonGe', requestTitle: 'Survey Report', dateSubmitted: 'September 21, 2013', amount: '$500', status: 'Completed', selected: false },
    { id: '20', providerName: 'Mohamede MonGe', requestTitle: 'Survey Report', dateSubmitted: 'September 21, 2013', amount: '$500', status: 'Rejected', selected: false },
    { id: '20', providerName: 'Mohamede MonGe', requestTitle: 'Survey Report', dateSubmitted: 'September 21, 2013', amount: '$500', status: 'Pending', selected: true },
    { id: '20', providerName: 'Mohamede MonGe', requestTitle: 'Survey Report', dateSubmitted: 'September 21, 2013', amount: '$500', status: 'Refund', selected: false },
    { id: '20', providerName: 'Mohamede MonGe', requestTitle: 'Survey Report', dateSubmitted: 'September 21, 2013', amount: '$500', status: 'Pending', selected: true },
    { id: '20', providerName: 'Mohamede MonGe', requestTitle: 'Survey Report', dateSubmitted: 'September 21, 2013', amount: '$500', status: 'Completed', selected: false },
    { id: '20', providerName: 'Mohamede MonGe', requestTitle: 'Survey Report', dateSubmitted: 'September 21, 2013', amount: '$500', status: 'Rejected', selected: false },
    { id: '20', providerName: 'Mohamede MonGe', requestTitle: 'Survey Report', dateSubmitted: 'September 21, 2013', amount: '$500', status: 'Pending', selected: true },
    { id: '20', providerName: 'Mohamede MonGe', requestTitle: 'Survey Report', dateSubmitted: 'September 21, 2013', amount: '$500', status: 'Pending', selected: true },
    { id: '20', providerName: 'Mohamede MonGe', requestTitle: 'Survey Report', dateSubmitted: 'September 21, 2013', amount: '$500', status: 'Pending', selected: true },
    { id: '20', providerName: 'Mohamede MonGe', requestTitle: 'Survey Report', dateSubmitted: 'September 21, 2013', amount: '$500', status: 'Rejected', selected: false },
    { id: '20', providerName: 'Mohamede MonGe', requestTitle: 'Survey Report', dateSubmitted: 'September 21, 2013', amount: '$500', status: 'Pending', selected: true },
    { id: '20', providerName: 'Mohamede MonGe', requestTitle: 'Survey Report', dateSubmitted: 'September 21, 2013', amount: '$500', status: 'Pending', selected: true },
    { id: '20', providerName: 'Mohamede MonGe', requestTitle: 'Survey Report', dateSubmitted: 'September 21, 2013', amount: '$500', status: 'Pending', selected: true },
  ];

  currentPage: number = 1;
  itemsPerPage: number = 4;
  Math = Math;

  toggleAll(event: Event) {
    event.preventDefault();
    this.users.forEach(user => user.selected = this.selectAll);
  }

  checkIfAllSelected() {
    this.selectAll = this.users.every(user => user.selected);
  }

  get paginatedUsers() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.users.slice(start, end);
  }

  setPage(page: number, event: Event) {
    event.preventDefault();
    this.currentPage = page;
  }
}
