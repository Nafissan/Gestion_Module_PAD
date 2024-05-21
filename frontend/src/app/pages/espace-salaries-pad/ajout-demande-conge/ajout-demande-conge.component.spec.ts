import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutDemandeCongeComponent } from './ajout-demande-conge.component';

describe('AjoutDemandeCongeComponent', () => {
  let component: AjoutDemandeCongeComponent;
  let fixture: ComponentFixture<AjoutDemandeCongeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutDemandeCongeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutDemandeCongeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
