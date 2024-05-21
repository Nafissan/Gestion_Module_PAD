import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEtapeabsenceComponent } from './list-etapeabsence.component';

describe('ListEtapeabsenceComponent', () => {
  let component: ListEtapeabsenceComponent;
  let fixture: ComponentFixture<ListEtapeabsenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListEtapeabsenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEtapeabsenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
