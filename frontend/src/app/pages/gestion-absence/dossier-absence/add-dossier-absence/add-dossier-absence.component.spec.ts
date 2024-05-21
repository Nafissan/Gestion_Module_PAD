import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDossierAbsenceComponent } from './add-dossier-absence.component';

describe('AddDossierAbsenceComponent', () => {
  let component: AddDossierAbsenceComponent;
  let fixture: ComponentFixture<AddDossierAbsenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDossierAbsenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDossierAbsenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
