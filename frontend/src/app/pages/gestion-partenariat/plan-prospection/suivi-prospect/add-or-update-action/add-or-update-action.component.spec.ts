import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrUpdateActionComponent } from './add-or-update-action.component';

describe('AddOrUpdateActionComponent', () => {
  let component: AddOrUpdateActionComponent;
  let fixture: ComponentFixture<AddOrUpdateActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrUpdateActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrUpdateActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
