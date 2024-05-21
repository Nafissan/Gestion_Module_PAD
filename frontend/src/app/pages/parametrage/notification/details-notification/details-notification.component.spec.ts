import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsNotificationComponent } from './details-notification.component';

describe('DetailsNotificationComponent', () => {
  let component: DetailsNotificationComponent;
  let fixture: ComponentFixture<DetailsNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
