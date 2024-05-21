import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeSuiviAttestationComponent } from './liste-suivi-attestation.component';

describe('ListeSuiviAttestationComponent', () => {
  let component: ListeSuiviAttestationComponent;
  let fixture: ComponentFixture<ListeSuiviAttestationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeSuiviAttestationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeSuiviAttestationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
