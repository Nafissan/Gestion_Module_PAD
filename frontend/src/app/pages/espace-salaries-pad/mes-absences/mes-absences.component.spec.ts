import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MesAbsencesComponent } from './mes-absences.component';

describe('MesAbsencesComponent', () => {
  let component: MesAbsencesComponent;
  let fixture: ComponentFixture<MesAbsencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MesAbsencesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MesAbsencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
