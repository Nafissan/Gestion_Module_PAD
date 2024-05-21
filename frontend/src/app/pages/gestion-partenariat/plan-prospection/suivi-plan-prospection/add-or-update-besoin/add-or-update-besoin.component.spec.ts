import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrUpdateBesoinComponent } from './add-or-update-besoin.component';

describe('AddOrUpdateBesoinComponent', () => {
  let component: AddOrUpdateBesoinComponent;
  let fixture: ComponentFixture<AddOrUpdateBesoinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrUpdateBesoinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrUpdateBesoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
