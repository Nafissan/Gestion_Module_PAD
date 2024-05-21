import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListValiderPlanningComponent } from './list-valider-planning.component';

describe('ListValiderPlanningComponent', () => {
  let component: ListValiderPlanningComponent;
  let fixture: ComponentFixture<ListValiderPlanningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListValiderPlanningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListValiderPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
