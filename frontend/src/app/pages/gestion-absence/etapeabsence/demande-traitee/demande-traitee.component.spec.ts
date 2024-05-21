import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeTraiteeComponent } from './demande-traitee.component';

describe('DemandeTraiteeComponent', () => {
  let component: DemandeTraiteeComponent;
  let fixture: ComponentFixture<DemandeTraiteeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandeTraiteeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeTraiteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
