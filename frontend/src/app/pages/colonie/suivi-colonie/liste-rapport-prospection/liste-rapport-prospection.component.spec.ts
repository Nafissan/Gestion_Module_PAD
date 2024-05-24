import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeRapportProspectionComponent } from './liste-rapport-prospection.component';

describe('ListeRapportProspectionComponent', () => {
  let component: ListeRapportProspectionComponent;
  let fixture: ComponentFixture<ListeRapportProspectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeRapportProspectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeRapportProspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
