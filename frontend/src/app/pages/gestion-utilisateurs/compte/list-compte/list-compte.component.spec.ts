import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCompteComponent } from './list-compte.component';

describe('ListCompteComponent', () => {
  let component: ListCompteComponent;
  let fixture: ComponentFixture<ListCompteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCompteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
