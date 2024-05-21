import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTypeDotationLaitComponent } from './details-type-dotation-lait.component';

describe('DetailsTypeDotationLaitComponent', () => {
  let component: DetailsTypeDotationLaitComponent;
  let fixture: ComponentFixture<DetailsTypeDotationLaitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsTypeDotationLaitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsTypeDotationLaitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
