import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateCompteComponent } from './create-update-compte.component';

describe('CreateUpdateCompteComponent', () => {
  let component: CreateUpdateCompteComponent;
  let fixture: ComponentFixture<CreateUpdateCompteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUpdateCompteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
