import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationsAgentsComponent } from './informations-agents.component';

describe('InformationsAgentsComponent', () => {
  let component: InformationsAgentsComponent;
  let fixture: ComponentFixture<InformationsAgentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformationsAgentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationsAgentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
