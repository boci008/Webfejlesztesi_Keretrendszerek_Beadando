import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicationRequestDetailedComponent } from './medication-request-detailed.component';

describe('MedicationRequestDetailedComponent', () => {
  let component: MedicationRequestDetailedComponent;
  let fixture: ComponentFixture<MedicationRequestDetailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicationRequestDetailedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicationRequestDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
