import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTypeDotationLaitComponent } from './list-type-dotation-lait.component';

describe('ListTypeDotationLaitComponent', () => {
  let component: ListTypeDotationLaitComponent;
  let fixture: ComponentFixture<ListTypeDotationLaitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTypeDotationLaitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTypeDotationLaitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
