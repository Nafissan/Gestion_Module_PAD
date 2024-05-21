import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListActiviteComponent } from './list-activite.component';

describe('ListActiviteComponent', () => {
  let component: ListActiviteComponent;
  let fixture: ComponentFixture<ListActiviteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListActiviteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListActiviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
