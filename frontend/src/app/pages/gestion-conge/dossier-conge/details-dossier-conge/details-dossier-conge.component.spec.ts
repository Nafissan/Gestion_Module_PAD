import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDossierCongeComponent } from './details-dossier-conge.component';

describe('DetailsDossierCongeComponent', () => {
  let component: DetailsDossierCongeComponent;
  let fixture: ComponentFixture<DetailsDossierCongeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsDossierCongeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsDossierCongeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
