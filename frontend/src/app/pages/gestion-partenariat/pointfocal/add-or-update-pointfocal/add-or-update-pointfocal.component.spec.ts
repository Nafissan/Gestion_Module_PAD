import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrUpdatePointfocalComponent } from './add-or-update-pointfocal.component';

describe('AddOrUpdatePointfocalComponent', () => {
  let component: AddOrUpdatePointfocalComponent;
  let fixture: ComponentFixture<AddOrUpdatePointfocalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrUpdatePointfocalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrUpdatePointfocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
