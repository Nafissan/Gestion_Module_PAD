import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutDemandeInterimComponent } from './ajout-demande-interim.component';

describe('AjoutDemandeInterimComponent', () => {
  let component: AjoutDemandeInterimComponent;
  let fixture: ComponentFixture<AjoutDemandeInterimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutDemandeInterimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutDemandeInterimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
