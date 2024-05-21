import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MotifRejetAbsenceComponent } from './motif-rejet-absence.component';

describe('MotifRejetAbsenceComponent', () => {
  let component: MotifRejetAbsenceComponent;
  let fixture: ComponentFixture<MotifRejetAbsenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotifRejetAbsenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotifRejetAbsenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
