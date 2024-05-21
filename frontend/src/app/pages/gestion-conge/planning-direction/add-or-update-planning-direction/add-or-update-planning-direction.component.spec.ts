import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrUpdatePlanningDirectionComponent } from './add-or-update-planning-direction.component';

describe('AddOrUpdatePlanningDirectionComponent', () => {
  let component: AddOrUpdatePlanningDirectionComponent;
  let fixture: ComponentFixture<AddOrUpdatePlanningDirectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrUpdatePlanningDirectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrUpdatePlanningDirectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
