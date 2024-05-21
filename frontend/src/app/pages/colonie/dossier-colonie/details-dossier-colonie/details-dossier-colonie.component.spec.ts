import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDossierColonieComponent } from './details-dossier-colonie.component';

describe('DetailsDossierColonieComponent', () => {
  let component: DetailsDossierColonieComponent;
  let fixture: ComponentFixture<DetailsDossierColonieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsDossierColonieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsDossierColonieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
