import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSuiviAttestationComponent } from './add-suivi-attestation.component';

describe('AddSuiviAttestationComponent', () => {
  let component: AddSuiviAttestationComponent;
  let fixture: ComponentFixture<AddSuiviAttestationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSuiviAttestationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSuiviAttestationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
