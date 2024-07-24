import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadFileDossierPelerinageComponent } from './read-file-dossier-pelerinage.component';

describe('ReadFileDossierPelerinageComponent', () => {
  let component: ReadFileDossierPelerinageComponent;
  let fixture: ComponentFixture<ReadFileDossierPelerinageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadFileDossierPelerinageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadFileDossierPelerinageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
