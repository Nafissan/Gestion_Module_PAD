import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrUpdateNotificationComponent } from './add-or-update-notification.component';

describe('AddOrUpdateNotificationComponent', () => {
  let component: AddOrUpdateNotificationComponent;
  let fixture: ComponentFixture<AddOrUpdateNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrUpdateNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrUpdateNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
