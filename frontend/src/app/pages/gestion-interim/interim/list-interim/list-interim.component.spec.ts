import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInterimComponent } from './list-interim.component';

describe('ListInterimComponent', () => {
  let component: ListInterimComponent;
  let fixture: ComponentFixture<ListInterimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListInterimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListInterimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
