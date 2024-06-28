import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListColonComponent } from './list-colon.component';

describe('ListColonComponent', () => {
  let component: ListColonComponent;
  let fixture: ComponentFixture<ListColonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListColonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListColonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
