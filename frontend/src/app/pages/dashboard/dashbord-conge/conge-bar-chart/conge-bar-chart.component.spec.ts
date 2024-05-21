import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CongeBarChartComponent } from './conge-bar-chart.component';

describe('CongeBarChartComponent', () => {
  let component: CongeBarChartComponent;
  let fixture: ComponentFixture<CongeBarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CongeBarChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CongeBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
