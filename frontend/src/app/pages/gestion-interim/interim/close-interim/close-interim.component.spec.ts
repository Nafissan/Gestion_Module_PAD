import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseInterimComponent } from './close-interim.component';

describe('CloseInterimComponent', () => {
  let component: CloseInterimComponent;
  let fixture: ComponentFixture<CloseInterimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloseInterimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseInterimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
