import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDossierPelerinageComponent } from './details-dossier-pelerinage.component';

describe('DetailsDossierPelerinageComponent', () => {
  let component: DetailsDossierPelerinageComponent;
  let fixture: ComponentFixture<DetailsDossierPelerinageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsDossierPelerinageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsDossierPelerinageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
