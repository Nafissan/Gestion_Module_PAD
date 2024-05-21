import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrUpdatePaysComponent } from './add-or-update-pays.component';

describe('AddOrUpdatePaysComponent', () => {
  let component: AddOrUpdatePaysComponent;
  let fixture: ComponentFixture<AddOrUpdatePaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrUpdatePaysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrUpdatePaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
