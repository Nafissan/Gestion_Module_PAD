import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAbsenceComponent } from './list-absence.component';

describe('ListAbsenceComponent', () => {
  let component: ListAbsenceComponent;
  let fixture: ComponentFixture<ListAbsenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAbsenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAbsenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
