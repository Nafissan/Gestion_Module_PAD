import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrUpdateDomaineComponent } from './add-or-update-domaine.component';

describe('AddOrUpdateDomaineComponent', () => {
  let component: AddOrUpdateDomaineComponent;
  let fixture: ComponentFixture<AddOrUpdateDomaineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrUpdateDomaineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrUpdateDomaineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
