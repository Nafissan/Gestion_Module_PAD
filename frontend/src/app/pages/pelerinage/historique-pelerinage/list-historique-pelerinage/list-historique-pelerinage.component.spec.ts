import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHistoriquePelerinageComponent } from './list-historique-pelerinage.component';

describe('ListHistoriquePelerinageComponent', () => {
  let component: ListHistoriquePelerinageComponent;
  let fixture: ComponentFixture<ListHistoriquePelerinageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListHistoriquePelerinageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListHistoriquePelerinageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
