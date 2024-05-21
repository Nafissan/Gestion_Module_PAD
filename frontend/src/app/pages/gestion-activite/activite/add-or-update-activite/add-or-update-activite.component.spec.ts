import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrUpdateActiviteComponent } from './add-or-update-activite.component';

describe('AddOrUpdateActiviteComponent', () => {
  let component: AddOrUpdateActiviteComponent;
  let fixture: ComponentFixture<AddOrUpdateActiviteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrUpdateActiviteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrUpdateActiviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
