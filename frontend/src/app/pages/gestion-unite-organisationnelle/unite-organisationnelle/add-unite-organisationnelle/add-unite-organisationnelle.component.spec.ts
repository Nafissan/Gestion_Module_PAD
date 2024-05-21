import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUniteOrganisationnelleComponent } from './add-unite-organisationnelle.component';

describe('AddUniteOrganisationnelleComponent', () => {
  let component: AddUniteOrganisationnelleComponent;
  let fixture: ComponentFixture<AddUniteOrganisationnelleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUniteOrganisationnelleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUniteOrganisationnelleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
