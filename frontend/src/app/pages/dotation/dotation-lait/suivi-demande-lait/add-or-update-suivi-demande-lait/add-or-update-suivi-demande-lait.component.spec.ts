import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrUpdateSuiviDemandeLaitComponent } from './add-or-update-suivi-demande-lait.component';

describe('AddOrUpdateSuiviDemandeLaitComponent', () => {
  let component: AddOrUpdateSuiviDemandeLaitComponent;
  let fixture: ComponentFixture<AddOrUpdateSuiviDemandeLaitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrUpdateSuiviDemandeLaitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrUpdateSuiviDemandeLaitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
