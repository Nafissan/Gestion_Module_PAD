import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsSuiviAttestationComponent } from './details-suivi-attestation.component';

describe('DetailsSuiviAttestationComponent', () => {
  let component: DetailsSuiviAttestationComponent;
  let fixture: ComponentFixture<DetailsSuiviAttestationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsSuiviAttestationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsSuiviAttestationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
