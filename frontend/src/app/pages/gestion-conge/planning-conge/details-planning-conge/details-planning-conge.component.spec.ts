import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPlanningCongeComponent } from './details-planning-conge.component';

describe('DetailsPlanningCongeComponent', () => {
  let component: DetailsPlanningCongeComponent;
  let fixture: ComponentFixture<DetailsPlanningCongeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsPlanningCongeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsPlanningCongeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
