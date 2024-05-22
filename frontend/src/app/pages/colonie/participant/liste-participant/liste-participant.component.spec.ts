import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeParticipantComponent } from './liste-participant.component';

describe('ListeParticipantComponent', () => {
  let component: ListeParticipantComponent;
  let fixture: ComponentFixture<ListeParticipantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeParticipantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
