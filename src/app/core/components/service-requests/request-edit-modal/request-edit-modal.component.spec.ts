import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestEditModalComponent } from './request-edit-modal.component';

describe('RequestEditModalComponent', () => {
  let component: RequestEditModalComponent;
  let fixture: ComponentFixture<RequestEditModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestEditModalComponent]
    });
    fixture = TestBed.createComponent(RequestEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
