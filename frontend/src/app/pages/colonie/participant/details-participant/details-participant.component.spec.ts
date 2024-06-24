import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsParticipantComponent } from './details-participant.component';

describe('DetailsParticipantComponent', () => {
  let component: DetailsParticipantComponent;
  let fixture: ComponentFixture<DetailsParticipantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsParticipantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
