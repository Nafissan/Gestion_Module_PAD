import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportAgentComponent } from './import-agent.component';

describe('ImportAgentComponent', () => {
  let component: ImportAgentComponent;
  let fixture: ComponentFixture<ImportAgentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportAgentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
