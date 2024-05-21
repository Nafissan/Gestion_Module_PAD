import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMotifAbsenceComponent } from './add-motif-absence.component';

describe('AddMotifAbsenceComponent', () => {
  let component: AddMotifAbsenceComponent;
  let fixture: ComponentFixture<AddMotifAbsenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMotifAbsenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMotifAbsenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
