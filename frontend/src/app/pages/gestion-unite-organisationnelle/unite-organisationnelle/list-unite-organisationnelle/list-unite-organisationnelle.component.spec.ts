import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUniteOrganisationnelleComponent } from './list-unite-organisationnelle.component';

describe('ListUniteOrganisationnelleComponent', () => {
  let component: ListUniteOrganisationnelleComponent;
  let fixture: ComponentFixture<ListUniteOrganisationnelleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListUniteOrganisationnelleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUniteOrganisationnelleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
