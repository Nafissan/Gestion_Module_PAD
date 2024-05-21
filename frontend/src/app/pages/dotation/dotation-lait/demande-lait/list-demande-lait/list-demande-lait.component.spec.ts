import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDemandeLaitComponent } from './list-demande-lait.component';

describe('ListDemandeLaitComponent', () => {
  let component: ListDemandeLaitComponent;
  let fixture: ComponentFixture<ListDemandeLaitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDemandeLaitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDemandeLaitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
