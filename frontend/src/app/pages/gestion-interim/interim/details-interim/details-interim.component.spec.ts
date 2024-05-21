import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsInterimComponent } from './details-interim.component';

describe('DetailsInterimComponent', () => {
  let component: DetailsInterimComponent;
  let fixture: ComponentFixture<DetailsInterimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsInterimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsInterimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
