import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendrierEvenementComponent } from './calendrier-evenement.component';

describe('CalendrierEvenementComponent', () => {
  let component: CalendrierEvenementComponent;
  let fixture: ComponentFixture<CalendrierEvenementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendrierEvenementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendrierEvenementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
