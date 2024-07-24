import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSatisfactionPelerinageComponent } from './list-satisfaction-pelerinage.component';

describe('ListSatisfactionPelerinageComponent', () => {
  let component: ListSatisfactionPelerinageComponent;
  let fixture: ComponentFixture<ListSatisfactionPelerinageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSatisfactionPelerinageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSatisfactionPelerinageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
