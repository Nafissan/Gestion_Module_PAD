import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejeterAbsenceComponent } from './rejeter-absence.component';

describe('RejeterAbsenceComponent', () => {
  let component: RejeterAbsenceComponent;
  let fixture: ComponentFixture<RejeterAbsenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejeterAbsenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejeterAbsenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
