import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrUpdateTypeDotationLaitComponent } from './add-or-update-type-dotation-lait.component';

describe('AddOrUpdateTypeDotationLaitComponent', () => {
  let component: AddOrUpdateTypeDotationLaitComponent;
  let fixture: ComponentFixture<AddOrUpdateTypeDotationLaitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrUpdateTypeDotationLaitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrUpdateTypeDotationLaitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
