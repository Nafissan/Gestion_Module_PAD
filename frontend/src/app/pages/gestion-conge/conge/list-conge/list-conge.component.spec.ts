import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCongeComponent } from './list-conge.component';

describe('ListCongeComponent', () => {
  let component: ListCongeComponent;
  let fixture: ComponentFixture<ListCongeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCongeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCongeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
