import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDossierAbsenceComponent } from './list-dossier-absence.component';

describe('ListDossierAbsenceComponent', () => {
  let component: ListDossierAbsenceComponent;
  let fixture: ComponentFixture<ListDossierAbsenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDossierAbsenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDossierAbsenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
