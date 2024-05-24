import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrUpdateSatisfactionComponent } from './add-or-update-satisfaction.component';

describe('AddOrUpdateSatisfactionComponent', () => {
  let component: AddOrUpdateSatisfactionComponent;
  let fixture: ComponentFixture<AddOrUpdateSatisfactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrUpdateSatisfactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrUpdateSatisfactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
