import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrUpdateRapportProspectionComponent } from './add-or-update-rapport-prospection.component';

describe('AddOrUpdateRapportProspectionComponent', () => {
  let component: AddOrUpdateRapportProspectionComponent;
  let fixture: ComponentFixture<AddOrUpdateRapportProspectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrUpdateRapportProspectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrUpdateRapportProspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
