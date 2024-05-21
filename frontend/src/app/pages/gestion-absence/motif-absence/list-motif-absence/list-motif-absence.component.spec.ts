import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMotifAbsenceComponent } from './list-motif-absence.component';

describe('ListMotifAbsenceComponent', () => {
  let component: ListMotifAbsenceComponent;
  let fixture: ComponentFixture<ListMotifAbsenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMotifAbsenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMotifAbsenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
