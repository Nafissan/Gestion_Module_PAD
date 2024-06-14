import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardColonieComponent } from './dashboard-colonie.component';

describe('DashboardColonieComponent', () => {
  let component: DashboardColonieComponent;
  let fixture: ComponentFixture<DashboardColonieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardColonieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardColonieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
