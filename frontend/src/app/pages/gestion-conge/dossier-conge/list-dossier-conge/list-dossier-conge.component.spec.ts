import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDossierCongeComponent } from './list-dossier-conge.component';

describe('ListDossierCongeComponent', () => {
  let component: ListDossierCongeComponent;
  let fixture: ComponentFixture<ListDossierCongeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDossierCongeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDossierCongeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
