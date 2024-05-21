import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateAgentComponent } from './create-update-agent.component';

describe('CreateUpdateAgentComponent', () => {
  let component: CreateUpdateAgentComponent;
  let fixture: ComponentFixture<CreateUpdateAgentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUpdateAgentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
