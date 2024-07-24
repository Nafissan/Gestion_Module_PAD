import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbordStatistiquePelerinageComponent } from './dashbord-statistique-pelerinage.component';

describe('DashbordStatistiquePelerinageComponent', () => {
  let component: DashbordStatistiquePelerinageComponent;
  let fixture: ComponentFixture<DashbordStatistiquePelerinageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashbordStatistiquePelerinageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashbordStatistiquePelerinageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
