import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejetInterimComponent } from './rejet-interim.component';

describe('RejetInterimComponent', () => {
  let component: RejetInterimComponent;
  let fixture: ComponentFixture<RejetInterimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejetInterimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejetInterimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
