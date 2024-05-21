import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInterimComponent } from './add-interim.component';

describe('AddInterimComponent', () => {
  let component: AddInterimComponent;
  let fixture: ComponentFixture<AddInterimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddInterimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInterimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
