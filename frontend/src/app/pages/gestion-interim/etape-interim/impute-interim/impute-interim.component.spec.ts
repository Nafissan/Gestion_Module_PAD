import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImputeInterimComponent } from './impute-interim.component';

describe('ImputeInterimComponent', () => {
  let component: ImputeInterimComponent;
  let fixture: ComponentFixture<ImputeInterimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImputeInterimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImputeInterimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
