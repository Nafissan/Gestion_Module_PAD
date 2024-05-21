import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrectionAttributionComponent } from './correction-attribution.component';

describe('CorrectionAttributionComponent', () => {
  let component: CorrectionAttributionComponent;
  let fixture: ComponentFixture<CorrectionAttributionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorrectionAttributionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorrectionAttributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
