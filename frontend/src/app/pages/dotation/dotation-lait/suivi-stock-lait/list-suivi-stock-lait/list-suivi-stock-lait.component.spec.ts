import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSuiviStockLaitComponent } from './list-suivi-stock-lait.component';

describe('ListSuiviStockLaitComponent', () => {
  let component: ListSuiviStockLaitComponent;
  let fixture: ComponentFixture<ListSuiviStockLaitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSuiviStockLaitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSuiviStockLaitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
