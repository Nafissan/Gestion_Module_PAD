import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrUpdatePlanningCongeComponent } from './add-or-update-planning-conge.component';

describe('AddOrUpdatePlanningCongeComponent', () => {
  let component: AddOrUpdatePlanningCongeComponent;
  let fixture: ComponentFixture<AddOrUpdatePlanningCongeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrUpdatePlanningCongeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrUpdatePlanningCongeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
