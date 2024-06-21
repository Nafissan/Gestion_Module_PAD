import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadFileDossierComponent } from './read-file-dossier.component';

describe('ReadFileDossierComponent', () => {
  let component: ReadFileDossierComponent;
  let fixture: ComponentFixture<ReadFileDossierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadFileDossierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadFileDossierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
