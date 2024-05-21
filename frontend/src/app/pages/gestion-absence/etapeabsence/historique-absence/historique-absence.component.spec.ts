import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueAbsenceComponent } from './historique-absence.component';

describe('HistoriqueAbsenceComponent', () => {
  let component: HistoriqueAbsenceComponent;
  let fixture: ComponentFixture<HistoriqueAbsenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoriqueAbsenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriqueAbsenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
