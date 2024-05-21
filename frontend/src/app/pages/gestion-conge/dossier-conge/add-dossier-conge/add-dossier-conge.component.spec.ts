import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDossierCongeComponent } from './add-dossier-conge.component';

describe('AddDossierCongeComponent', () => {
  let component: AddDossierCongeComponent;
  let fixture: ComponentFixture<AddDossierCongeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDossierCongeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDossierCongeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
