import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueInterimComponent } from './historique-interim.component';

describe('HistoriqueInterimComponent', () => {
  let component: HistoriqueInterimComponent;
  let fixture: ComponentFixture<HistoriqueInterimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoriqueInterimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriqueInterimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
