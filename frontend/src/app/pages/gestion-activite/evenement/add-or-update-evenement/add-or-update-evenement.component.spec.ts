import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrUpdateEvenementComponent } from './add-or-update-evenement.component';

describe('AddOrUpdateEvenementComponent', () => {
  let component: AddOrUpdateEvenementComponent;
  let fixture: ComponentFixture<AddOrUpdateEvenementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrUpdateEvenementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrUpdateEvenementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
