import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStockLaitComponent } from './list-stock-lait.component';

describe('ListStockLaitComponent', () => {
  let component: ListStockLaitComponent;
  let fixture: ComponentFixture<ListStockLaitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListStockLaitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListStockLaitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
