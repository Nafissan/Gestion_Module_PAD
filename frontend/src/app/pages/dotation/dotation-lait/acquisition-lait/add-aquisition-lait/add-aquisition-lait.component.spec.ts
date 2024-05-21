import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAquisitionLaitComponent } from './add-aquisition-lait.component';

describe('AddAquisitionLaitComponent', () => {
  let component: AddAquisitionLaitComponent;
  let fixture: ComponentFixture<AddAquisitionLaitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAquisitionLaitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAquisitionLaitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
