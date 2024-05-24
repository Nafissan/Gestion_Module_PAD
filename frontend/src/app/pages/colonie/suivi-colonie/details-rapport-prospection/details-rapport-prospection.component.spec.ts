import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsRapportProspectionComponent } from './details-rapport-prospection.component';

describe('DetailsRapportProspectionComponent', () => {
  let component: DetailsRapportProspectionComponent;
  let fixture: ComponentFixture<DetailsRapportProspectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsRapportProspectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsRapportProspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
