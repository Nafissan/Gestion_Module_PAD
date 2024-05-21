import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSuiviDemandeLaitComponent } from './list-suivi-demande-lait.component';

describe('ListSuiviDemandeLaitComponent', () => {
  let component: ListSuiviDemandeLaitComponent;
  let fixture: ComponentFixture<ListSuiviDemandeLaitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSuiviDemandeLaitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSuiviDemandeLaitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
