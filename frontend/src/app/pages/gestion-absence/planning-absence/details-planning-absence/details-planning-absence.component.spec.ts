import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPlanningAbsenceComponent } from './details-planning-absence.component';

describe('DetailsPlanningAbsenceComponent', () => {
  let component: DetailsPlanningAbsenceComponent;
  let fixture: ComponentFixture<DetailsPlanningAbsenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsPlanningAbsenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsPlanningAbsenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
