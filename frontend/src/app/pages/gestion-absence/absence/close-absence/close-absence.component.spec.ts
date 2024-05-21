import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseAbsenceComponent } from './close-absence.component';

describe('CloseAbsenceComponent', () => {
  let component: CloseAbsenceComponent;
  let fixture: ComponentFixture<CloseAbsenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloseAbsenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseAbsenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
