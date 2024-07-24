import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrUpdateSatisfactionPelerinageComponent } from './add-or-update-satisfaction-pelerinage.component';

describe('AddOrUpdateSatisfactionPelerinageComponent', () => {
  let component: AddOrUpdateSatisfactionPelerinageComponent;
  let fixture: ComponentFixture<AddOrUpdateSatisfactionPelerinageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrUpdateSatisfactionPelerinageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrUpdateSatisfactionPelerinageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
