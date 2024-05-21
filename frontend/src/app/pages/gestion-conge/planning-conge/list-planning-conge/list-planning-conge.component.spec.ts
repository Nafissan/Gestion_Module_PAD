import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPlanningCongeComponent } from './list-planning-conge.component';

describe('ListPlanningCongeComponent', () => {
  let component: ListPlanningCongeComponent;
  let fixture: ComponentFixture<ListPlanningCongeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPlanningCongeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPlanningCongeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
