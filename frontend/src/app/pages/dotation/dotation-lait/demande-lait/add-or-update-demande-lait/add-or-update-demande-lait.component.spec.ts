import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrUpdateDemandeLaitComponent } from './add-or-update-demande-lait.component';

describe('AddOrUpdateDemandeLaitComponent', () => {
  let component: AddOrUpdateDemandeLaitComponent;
  let fixture: ComponentFixture<AddOrUpdateDemandeLaitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrUpdateDemandeLaitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrUpdateDemandeLaitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
