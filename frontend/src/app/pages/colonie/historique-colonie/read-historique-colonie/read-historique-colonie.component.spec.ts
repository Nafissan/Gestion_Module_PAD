import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadHistoriqueColonieComponent } from './read-historique-colonie.component';

describe('ReadHistoriqueColonieComponent', () => {
  let component: ReadHistoriqueColonieComponent;
  let fixture: ComponentFixture<ReadHistoriqueColonieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadHistoriqueColonieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadHistoriqueColonieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
