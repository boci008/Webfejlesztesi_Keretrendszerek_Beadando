import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetMedicationComponent } from './get-medication.component';

describe('GetMedicationComponent', () => {
  let component: GetMedicationComponent;
  let fixture: ComponentFixture<GetMedicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetMedicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetMedicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
