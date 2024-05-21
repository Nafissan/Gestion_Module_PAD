import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsenceBarChartComponent } from './absence-bar-chart.component';

describe('AbsenceBarChartComponent', () => {
  let component: AbsenceBarChartComponent;
  let fixture: ComponentFixture<AbsenceBarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbsenceBarChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsenceBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
