import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPlanningDirectionComponent } from './list-planning-direction.component';

describe('ListPlanningDirectionComponent', () => {
  let component: ListPlanningDirectionComponent;
  let fixture: ComponentFixture<ListPlanningDirectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPlanningDirectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPlanningDirectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
