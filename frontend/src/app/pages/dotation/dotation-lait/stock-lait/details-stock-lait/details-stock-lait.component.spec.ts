import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsStockLaitComponent } from './details-stock-lait.component';

describe('DetailsStockLaitComponent', () => {
  let component: DetailsStockLaitComponent;
  let fixture: ComponentFixture<DetailsStockLaitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsStockLaitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsStockLaitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
