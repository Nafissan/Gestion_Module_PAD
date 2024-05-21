import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsMotifAbsenceComponent } from './details-motif-absence.component';

describe('DetailsMotifAbsenceComponent', () => {
  let component: DetailsMotifAbsenceComponent;
  let fixture: ComponentFixture<DetailsMotifAbsenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsMotifAbsenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsMotifAbsenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
