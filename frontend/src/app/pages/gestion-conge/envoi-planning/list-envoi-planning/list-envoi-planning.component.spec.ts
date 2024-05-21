import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEnvoiPlanningComponent } from './list-envoi-planning.component';

describe('ListEnvoiPlanningComponent', () => {
  let component: ListEnvoiPlanningComponent;
  let fixture: ComponentFixture<ListEnvoiPlanningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListEnvoiPlanningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEnvoiPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
