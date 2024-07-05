import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsColonComponent } from './details-colon.component';

describe('DetailsColonComponent', () => {
  let component: DetailsColonComponent;
  let fixture: ComponentFixture<DetailsColonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsColonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsColonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
