import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutDemandeAttestationComponent } from './ajout-demande-attestation.component';

describe('AjoutDemandeAttestationComponent', () => {
  let component: AjoutDemandeAttestationComponent;
  let fixture: ComponentFixture<AjoutDemandeAttestationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutDemandeAttestationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutDemandeAttestationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
