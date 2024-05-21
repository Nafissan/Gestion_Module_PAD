import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuiviCategorieStockComponent } from './suivi-categorie-stock.component';

describe('SuiviCategorieStockComponent', () => {
  let component: SuiviCategorieStockComponent;
  let fixture: ComponentFixture<SuiviCategorieStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuiviCategorieStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuiviCategorieStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
