import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlanningAbsenceComponent } from './add-planning-absence.component';

describe('AddPlanningAbsenceComponent', () => {
  let component: AddPlanningAbsenceComponent;
  let fixture: ComponentFixture<AddPlanningAbsenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPlanningAbsenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPlanningAbsenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
