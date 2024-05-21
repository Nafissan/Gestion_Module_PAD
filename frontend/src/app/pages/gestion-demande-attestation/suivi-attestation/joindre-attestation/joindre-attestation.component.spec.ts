import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoindreAttestationComponent } from './joindre-attestation.component';

describe('JoindreAttestationComponent', () => {
  let component: JoindreAttestationComponent;
  let fixture: ComponentFixture<JoindreAttestationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoindreAttestationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoindreAttestationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
