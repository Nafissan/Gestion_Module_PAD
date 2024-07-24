import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrUpdateDossierPelerinageComponent } from './add-or-update-dossier-pelerinage.component';

describe('AddOrUpdateDossierPelerinageComponent', () => {
  let component: AddOrUpdateDossierPelerinageComponent;
  let fixture: ComponentFixture<AddOrUpdateDossierPelerinageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrUpdateDossierPelerinageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrUpdateDossierPelerinageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
