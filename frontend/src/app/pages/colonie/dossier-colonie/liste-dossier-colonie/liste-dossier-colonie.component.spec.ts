import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDossierColonieComponent } from './liste-dossier-colonie.component';

describe('ListeDossierColonieComponent', () => {
  let component: ListeDossierColonieComponent;
  let fixture: ComponentFixture<ListeDossierColonieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeDossierColonieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeDossierColonieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
