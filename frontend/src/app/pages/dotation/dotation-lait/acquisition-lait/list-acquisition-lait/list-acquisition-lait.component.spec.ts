import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAcquisitionLaitComponent } from './list-acquisition-lait.component';

describe('ListAcquisitionLaitComponent', () => {
  let component: ListAcquisitionLaitComponent;
  let fixture: ComponentFixture<ListAcquisitionLaitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAcquisitionLaitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAcquisitionLaitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
