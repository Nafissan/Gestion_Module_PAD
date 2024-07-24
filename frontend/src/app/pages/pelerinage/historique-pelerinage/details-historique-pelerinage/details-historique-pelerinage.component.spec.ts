import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsHistoriquePelerinageComponent } from './details-historique-pelerinage.component';

describe('DetailsHistoriquePelerinageComponent', () => {
  let component: DetailsHistoriquePelerinageComponent;
  let fixture: ComponentFixture<DetailsHistoriquePelerinageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsHistoriquePelerinageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsHistoriquePelerinageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
