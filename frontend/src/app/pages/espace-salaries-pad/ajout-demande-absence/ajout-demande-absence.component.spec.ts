import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutDemandeAbsenceComponent } from './ajout-demande-absence.component';

describe('AjoutAbsenceComponent', () => {
  let component: AjoutDemandeAbsenceComponent;
  let fixture: ComponentFixture<AjoutDemandeAbsenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutDemandeAbsenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutDemandeAbsenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
