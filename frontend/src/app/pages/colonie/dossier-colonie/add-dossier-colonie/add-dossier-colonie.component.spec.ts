import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDossierColonieComponent } from './add-dossier-colonie.component';

describe('AddDossierColonieComponent', () => {
  let component: AddDossierColonieComponent;
  let fixture: ComponentFixture<AddDossierColonieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDossierColonieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDossierColonieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
