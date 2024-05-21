import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMarqueLaitComponent } from './add-marque-lait.component';

describe('AddMarqueLaitComponent', () => {
  let component: AddMarqueLaitComponent;
  let fixture: ComponentFixture<AddMarqueLaitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMarqueLaitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMarqueLaitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
