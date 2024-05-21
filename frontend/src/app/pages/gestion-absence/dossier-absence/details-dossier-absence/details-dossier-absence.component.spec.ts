import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDossierAbsenceComponent } from './details-dossier-absence.component';

describe('DetailsDossierAbsenceComponent', () => {
  let component: DetailsDossierAbsenceComponent;
  let fixture: ComponentFixture<DetailsDossierAbsenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsDossierAbsenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsDossierAbsenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
