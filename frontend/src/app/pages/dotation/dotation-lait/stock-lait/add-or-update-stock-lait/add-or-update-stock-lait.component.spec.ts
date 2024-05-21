import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrUpdateStockLaitComponent } from './add-or-update-stock-lait.component';

describe('AddOrUpdateStockLaitComponent', () => {
  let component: AddOrUpdateStockLaitComponent;
  let fixture: ComponentFixture<AddOrUpdateStockLaitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrUpdateStockLaitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrUpdateStockLaitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
