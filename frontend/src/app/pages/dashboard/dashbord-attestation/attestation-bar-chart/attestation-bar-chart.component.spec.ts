import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttestationBarChartComponent } from './attestation-bar-chart.component';

describe('AttestationBarChartComponent', () => {
  let component: AttestationBarChartComponent;
  let fixture: ComponentFixture<AttestationBarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttestationBarChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttestationBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
