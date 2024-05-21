import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationInterneInterimComponent } from './validation-interne-interim.component';

describe('ValidationInterneInterimComponent', () => {
  let component: ValidationInterneInterimComponent;
  let fixture: ComponentFixture<ValidationInterneInterimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationInterneInterimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationInterneInterimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
