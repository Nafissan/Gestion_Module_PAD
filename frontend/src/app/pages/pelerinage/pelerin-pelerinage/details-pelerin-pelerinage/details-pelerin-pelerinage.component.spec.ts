import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPelerinPelerinageComponent } from './details-pelerin-pelerinage.component';

describe('DetailsPelerinPelerinageComponent', () => {
  let component: DetailsPelerinPelerinageComponent;
  let fixture: ComponentFixture<DetailsPelerinPelerinageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsPelerinPelerinageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsPelerinPelerinageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
