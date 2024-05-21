import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMarqueLaitComponent } from './list-marque-lait.component';

describe('ListMarqueLaitComponent', () => {
  let component: ListMarqueLaitComponent;
  let fixture: ComponentFixture<ListMarqueLaitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMarqueLaitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMarqueLaitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
