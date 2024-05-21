import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListContinentComponent } from './list-continent.component';

describe('ListContinentComponent', () => {
  let component: ListContinentComponent;
  let fixture: ComponentFixture<ListContinentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListContinentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListContinentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
