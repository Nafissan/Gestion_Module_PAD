import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuiviInterimComponent } from './suivi-interim.component';

describe('SuiviInterimComponent', () => {
  let component: SuiviInterimComponent;
  let fixture: ComponentFixture<SuiviInterimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuiviInterimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuiviInterimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
