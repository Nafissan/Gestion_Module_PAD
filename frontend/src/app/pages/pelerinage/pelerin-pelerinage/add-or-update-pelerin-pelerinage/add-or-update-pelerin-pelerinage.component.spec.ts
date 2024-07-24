import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrUpdatePelerinPelerinageComponent } from './add-or-update-pelerin-pelerinage.component';

describe('AddOrUpdatePelerinPelerinageComponent', () => {
  let component: AddOrUpdatePelerinPelerinageComponent;
  let fixture: ComponentFixture<AddOrUpdatePelerinPelerinageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrUpdatePelerinPelerinageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrUpdatePelerinPelerinageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
