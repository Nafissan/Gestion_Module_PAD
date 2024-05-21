import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSuiviInterimComponent } from './list-suivi-interim.component';

describe('ListSuiviInterimComponent', () => {
  let component: ListSuiviInterimComponent;
  let fixture: ComponentFixture<ListSuiviInterimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSuiviInterimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSuiviInterimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
