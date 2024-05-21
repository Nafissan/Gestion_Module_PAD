import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsUniteOrganisationnelleComponent } from './details-unite-organisationnelle.component';

describe('DetailsUniteOrganisationnelleComponent', () => {
  let component: DetailsUniteOrganisationnelleComponent;
  let fixture: ComponentFixture<DetailsUniteOrganisationnelleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsUniteOrganisationnelleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsUniteOrganisationnelleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
