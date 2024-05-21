import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardLaitComponent } from './dashboard-lait.component';

describe('DashboardLaitComponent', () => {
  let component: DashboardLaitComponent;
  let fixture: ComponentFixture<DashboardLaitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardLaitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardLaitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
