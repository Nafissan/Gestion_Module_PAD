import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsenceDirectionComponent } from './absence-direction.component';

describe('AbsenceDirectionComponent', () => {
  let component: AbsenceDirectionComponent;
  let fixture: ComponentFixture<AbsenceDirectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbsenceDirectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsenceDirectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
