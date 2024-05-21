import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrectionStockComponent } from './correction-stock.component';

describe('CorrectionStockComponent', () => {
  let component: CorrectionStockComponent;
  let fixture: ComponentFixture<CorrectionStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorrectionStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorrectionStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
