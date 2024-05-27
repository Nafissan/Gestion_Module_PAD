import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadFileParticipantComponent } from './read-file-participant.component';

describe('ReadFileParticipantComponent', () => {
  let component: ReadFileParticipantComponent;
  let fixture: ComponentFixture<ReadFileParticipantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadFileParticipantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadFileParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
