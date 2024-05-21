import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImputerAbsenceComponent } from './imputer-absence.component';

describe('ImputerAbsenceComponent', () => {
  let component: ImputerAbsenceComponent;
  let fixture: ComponentFixture<ImputerAbsenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImputerAbsenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImputerAbsenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
