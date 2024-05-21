import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrUpdateCongeComponent } from './add-or-update-conge.component';

describe('AddOrUpdateCongeComponent', () => {
  let component: AddOrUpdateCongeComponent;
  let fixture: ComponentFixture<AddOrUpdateCongeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrUpdateCongeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrUpdateCongeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
