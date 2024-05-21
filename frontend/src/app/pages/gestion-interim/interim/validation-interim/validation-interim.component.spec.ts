import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationInterimComponent } from './validation-interim.component';

describe('ValidationInterimComponent', () => {
  let component: ValidationInterimComponent;
  let fixture: ComponentFixture<ValidationInterimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationInterimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationInterimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
