import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterimBarChartComponent } from './interim-bar-chart.component';

describe('InterimBarChartComponent', () => {
  let component: InterimBarChartComponent;
  let fixture: ComponentFixture<InterimBarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterimBarChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterimBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
