import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeHistoriqueColonieComponent } from './liste-historique-colonie.component';

describe('ListeHistoriqueColonieComponent', () => {
  let component: ListeHistoriqueColonieComponent;
  let fixture: ComponentFixture<ListeHistoriqueColonieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeHistoriqueColonieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeHistoriqueColonieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
