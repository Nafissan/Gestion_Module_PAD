import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsSuiviStockLaitComponent } from './details-suivi-stock-lait.component';

describe('DetailsSuiviStockLaitComponent', () => {
  let component: DetailsSuiviStockLaitComponent;
  let fixture: ComponentFixture<DetailsSuiviStockLaitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsSuiviStockLaitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsSuiviStockLaitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
