import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrUpdateZoneComponent } from './add-or-update-zone.component';

describe('AddOrUpdateZoneComponent', () => {
  let component: AddOrUpdateZoneComponent;
  let fixture: ComponentFixture<AddOrUpdateZoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrUpdateZoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrUpdateZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
