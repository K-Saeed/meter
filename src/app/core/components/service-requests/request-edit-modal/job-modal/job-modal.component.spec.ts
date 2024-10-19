import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobModalComponent } from './job-modal.component';

describe('JobModalComponent', () => {
  let component: JobModalComponent;
  let fixture: ComponentFixture<JobModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobModalComponent]
    });
    fixture = TestBed.createComponent(JobModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});