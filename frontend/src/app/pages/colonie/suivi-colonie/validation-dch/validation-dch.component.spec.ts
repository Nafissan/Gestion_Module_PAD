import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationDchComponent } from './validation-dch.component';

describe('ValidationDchComponent', () => {
  let component: ValidationDchComponent;
  let fixture: ComponentFixture<ValidationDchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationDchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationDchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
