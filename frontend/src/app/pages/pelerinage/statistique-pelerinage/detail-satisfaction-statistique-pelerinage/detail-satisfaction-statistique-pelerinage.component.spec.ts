import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSatisfactionStatistiquePelerinageComponent } from './detail-satisfaction-statistique-pelerinage.component';

describe('DetailSatisfactionStatistiquePelerinageComponent', () => {
  let component: DetailSatisfactionStatistiquePelerinageComponent;
  let fixture: ComponentFixture<DetailSatisfactionStatistiquePelerinageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailSatisfactionStatistiquePelerinageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailSatisfactionStatistiquePelerinageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
