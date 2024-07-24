import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsSatisfactionPelerinageComponent } from './details-satisfaction-pelerinage.component';

describe('DetailsSatisfactionPelerinageComponent', () => {
  let component: DetailsSatisfactionPelerinageComponent;
  let fixture: ComponentFixture<DetailsSatisfactionPelerinageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsSatisfactionPelerinageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsSatisfactionPelerinageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
