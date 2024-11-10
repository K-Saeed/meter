import { Component, Input, OnInit } from '@angular/core';
import { UserTableDto } from '../models/user-table.model';

@Component({
  selector: 'app-user-show-details-modal',
  templateUrl: './user-show-details-modal.component.html',
  styleUrls: ['./user-show-details-modal.component.css']
})
export class UserShowDetailsModalComponent implements OnInit {
  @Input () user?: UserTableDto;

  logoPath?: string;
  ngOnInit(): void {

  }

}
