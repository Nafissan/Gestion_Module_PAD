import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPlanningAbsenceComponent } from './list-planning-absence.component';

describe('ListPlanningAbsenceComponent', () => {
  let component: ListPlanningAbsenceComponent;
  let fixture: ComponentFixture<ListPlanningAbsenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPlanningAbsenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPlanningAbsenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
