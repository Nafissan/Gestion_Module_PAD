import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsAbsenceComponent } from './details-absence.component';

describe('DetailsAbsenceComponent', () => {
  let component: DetailsAbsenceComponent;
  let fixture: ComponentFixture<DetailsAbsenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsAbsenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsAbsenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
