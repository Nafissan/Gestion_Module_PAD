import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeSatisfactionComponent } from './liste-satisfaction.component';

describe('ListeSatisfactionComponent', () => {
  let component: ListeSatisfactionComponent;
  let fixture: ComponentFixture<ListeSatisfactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeSatisfactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeSatisfactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
