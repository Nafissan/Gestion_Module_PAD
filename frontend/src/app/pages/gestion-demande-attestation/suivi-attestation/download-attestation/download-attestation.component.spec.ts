import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadAttestationComponent } from './download-attestation.component';

describe('DownloadAttestationComponent', () => {
  let component: DownloadAttestationComponent;
  let fixture: ComponentFixture<DownloadAttestationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadAttestationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadAttestationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
