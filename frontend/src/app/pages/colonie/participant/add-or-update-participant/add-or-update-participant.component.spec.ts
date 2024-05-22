import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrUpdateParticipantComponent } from './add-or-update-participant.component';

describe('AddOrUpdateParticipantComponent', () => {
  let component: AddOrUpdateParticipantComponent;
  let fixture: ComponentFixture<AddOrUpdateParticipantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrUpdateParticipantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrUpdateParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
