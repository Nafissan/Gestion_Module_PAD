import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrUpdateMembreComponent } from './add-or-update-membre.component';

describe('AddOrUpdateMembreComponent', () => {
  let component: AddOrUpdateMembreComponent;
  let fixture: ComponentFixture<AddOrUpdateMembreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrUpdateMembreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrUpdateMembreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
