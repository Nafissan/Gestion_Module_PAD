import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPelerinPelerinageComponent } from './list-pelerin-pelerinage.component';

describe('ListPelerinPelerinageComponent', () => {
  let component: ListPelerinPelerinageComponent;
  let fixture: ComponentFixture<ListPelerinPelerinageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPelerinPelerinageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPelerinPelerinageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
