import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapPartenairesComponent } from './map-partenaires.component';

describe('MapPartenairesComponent', () => {
  let component: MapPartenairesComponent;
  let fixture: ComponentFixture<MapPartenairesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapPartenairesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapPartenairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
