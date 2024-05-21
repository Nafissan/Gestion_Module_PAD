import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejeterAttestationComponent } from './rejeter-attestation.component';

describe('RejeterAttestationComponent', () => {
  let component: RejeterAttestationComponent;
  let fixture: ComponentFixture<RejeterAttestationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejeterAttestationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejeterAttestationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
