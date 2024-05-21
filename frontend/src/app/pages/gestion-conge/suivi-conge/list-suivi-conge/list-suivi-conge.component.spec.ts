import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSuiviCongeComponent } from './list-suivi-conge.component';

describe('ListSuiviCongeComponent', () => {
  let component: ListSuiviCongeComponent;
  let fixture: ComponentFixture<ListSuiviCongeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSuiviCongeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSuiviCongeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
