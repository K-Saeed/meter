import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolationModalComponent } from './consolation-modal.component';

describe('ConsolationModalComponent', () => {
  let component: ConsolationModalComponent;
  let fixture: ComponentFixture<ConsolationModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsolationModalComponent]
    });
    fixture = TestBed.createComponent(ConsolationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
