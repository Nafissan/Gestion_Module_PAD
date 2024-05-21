import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComiteComponent } from './list-comite.component';

describe('ListComiteComponent', () => {
  let component: ListComiteComponent;
  let fixture: ComponentFixture<ListComiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListComiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
