import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPointfocalComponent } from './list-pointfocal.component';

describe('ListPointfocalComponent', () => {
  let component: ListPointfocalComponent;
  let fixture: ComponentFixture<ListPointfocalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPointfocalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPointfocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
