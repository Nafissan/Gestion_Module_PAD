import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationParticipantComponent } from './validation-participant.component';

describe('ValidationParticipantComponent', () => {
  let component: ValidationParticipantComponent;
  let fixture: ComponentFixture<ValidationParticipantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationParticipantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
