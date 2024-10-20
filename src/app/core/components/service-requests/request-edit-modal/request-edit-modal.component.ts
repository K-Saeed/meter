import { Component, Input, OnInit, OnChanges, SimpleChanges, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RequestResponseDto } from '../models/request-table.model';
import { FormDataService } from './form-data.service';

declare var bootstrap: any; // Declaring the global `bootstrap` variable

@Component({
  selector: 'app-request-edit-modal',
  templateUrl: './request-edit-modal.component.html',
  styleUrls: ['./request-edit-modal.component.css']
})
export class RequestEditModalComponent implements OnInit, OnChanges {
  @Input() request?: RequestResponseDto;
  editForm!: FormGroup;

  @ViewChild('editModal') editModal!: ElementRef; // Reference to the modal element

  constructor(private formDataService: FormDataService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.editForm = new FormGroup({
      type: new FormControl(''),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['request'] && this.request) {
      this.editForm.controls['type'].setValue(this.request.type || '');

      if (this.shouldDisableControl(this.request.type)) {
        this.editForm.controls['type'].disable();
      } else {
        this.editForm.controls['type'].enable();
      }

      // Manually trigger change detection after form updates
      this.cdr.detectChanges();

      // Trigger modal opening based on the type
      this.openModal();
    }
  }

  openModal() {
    const modalElement = new bootstrap.Modal(this.editModal.nativeElement); // Use bootstrap.Modal to open the modal
    modalElement.show();

    // Manually trigger change detection after opening the modal
    this.cdr.detectChanges();
  }

  shouldDisableControl(type: string | undefined): boolean {
    return type === 'Engineering Job';
  }
}
