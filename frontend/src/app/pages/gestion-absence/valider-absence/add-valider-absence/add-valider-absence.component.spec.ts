import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddValiderAbsenceComponent } from './add-valider-absence.component';

describe('AddValiderAbsenceComponent', () => {
  let component: AddValiderAbsenceComponent;
  let fixture: ComponentFixture<AddValiderAbsenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddValiderAbsenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddValiderAbsenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
