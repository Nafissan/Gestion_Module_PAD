import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailDemandeAttestationComponent } from './detail-demande-attestation.component';

describe('DetailDemandeAttestationComponent', () => {
  let component: DetailDemandeAttestationComponent;
  let fixture: ComponentFixture<DetailDemandeAttestationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailDemandeAttestationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailDemandeAttestationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
