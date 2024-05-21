import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsEtapeabsenceComponent } from './details-etapeabsence.component';

describe('DetailsEtapeabsenceComponent', () => {
  let component: DetailsEtapeabsenceComponent;
  let fixture: ComponentFixture<DetailsEtapeabsenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsEtapeabsenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsEtapeabsenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
