import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEtapeabsenceComponent } from './add-etapeabsence.component';

describe('AddEtapeabsenceComponent', () => {
  let component: AddEtapeabsenceComponent;
  let fixture: ComponentFixture<AddEtapeabsenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEtapeabsenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEtapeabsenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
