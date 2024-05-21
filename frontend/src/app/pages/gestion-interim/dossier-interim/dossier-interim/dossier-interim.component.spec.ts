import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DossierInterimComponent } from './dossier-interim.component';

describe('DossierInterimComponent', () => {
  let component: DossierInterimComponent;
  let fixture: ComponentFixture<DossierInterimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DossierInterimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DossierInterimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
