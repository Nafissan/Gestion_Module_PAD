import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDossierPelerinageComponent } from './list-dossier-pelerinage.component';

describe('ListDossierPelerinageComponent', () => {
  let component: ListDossierPelerinageComponent;
  let fixture: ComponentFixture<ListDossierPelerinageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDossierPelerinageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDossierPelerinageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
