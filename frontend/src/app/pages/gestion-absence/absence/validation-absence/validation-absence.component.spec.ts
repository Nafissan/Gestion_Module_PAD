import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationAbsenceComponent } from './validation-absence.component';

describe('ValidationAbsenceComponent', () => {
  let component: ValidationAbsenceComponent;
  let fixture: ComponentFixture<ValidationAbsenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationAbsenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationAbsenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
