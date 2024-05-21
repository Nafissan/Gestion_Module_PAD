import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAttestationComponent } from './list-attestation.component';

describe('ListAttestationComponent', () => {
  let component: ListAttestationComponent;
  let fixture: ComponentFixture<ListAttestationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAttestationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAttestationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
