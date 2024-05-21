import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrUpdateSuiviStockLaitComponent } from './add-or-update-suivi-stock-lait.component';

describe('AddOrUpdateSuiviStockLaitComponent', () => {
  let component: AddOrUpdateSuiviStockLaitComponent;
  let fixture: ComponentFixture<AddOrUpdateSuiviStockLaitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrUpdateSuiviStockLaitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrUpdateSuiviStockLaitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
