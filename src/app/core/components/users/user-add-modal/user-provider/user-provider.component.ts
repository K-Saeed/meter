import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-provider',
  templateUrl: './user-provider.component.html',
  styleUrls: ['./user-provider.component.css']
})
export class UserProviderComponent implements OnInit {
  @Input() parentForm!: FormGroup;
  @Input() openNextModal!: () => void;

  Providers = [
    { name: 'Company', selected: false },
    { name: 'Establishment', selected: false },
    { name: 'Office', selected: false },
  ];

  Activities = [
    { name: 'Survey Office', selected: false },
    { name: 'Engineering Office', selected: false },
    { name: 'Design Office', selected: false },
    { name: 'Interior Design Office', selected: false },
    { name: 'Other', selected: false },
  ];

  dropdownOpen: 'none' | 'provider' | 'activity' = 'none';

  ngOnInit(): void {}

  toggleDropdown(type: 'provider' | 'activity') {
    this.dropdownOpen = this.dropdownOpen === type ? 'none' : type;
  }

  updateProviderType(provider: string) {
    this.parentForm.controls['providerType'].setValue(provider);
    this.dropdownOpen = 'none';
  }

  updateActivityType(activity: string) {
    this.parentForm.controls['activityType'].setValue(activity);
    this.dropdownOpen = 'none';
  }
}
