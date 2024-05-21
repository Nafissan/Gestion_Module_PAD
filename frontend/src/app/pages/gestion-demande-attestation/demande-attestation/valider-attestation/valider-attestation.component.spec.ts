import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValiderAttestationComponent } from './valider-attestation.component';

describe('ValiderAttestationComponent', () => {
  let component: ValiderAttestationComponent;
  let fixture: ComponentFixture<ValiderAttestationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValiderAttestationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValiderAttestationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
