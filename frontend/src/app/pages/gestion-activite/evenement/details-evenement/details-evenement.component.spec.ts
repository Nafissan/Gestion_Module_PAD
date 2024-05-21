import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsEvenementComponent } from './details-evenement.component';

describe('DetailsEvenementComponent', () => {
  let component: DetailsEvenementComponent;
  let fixture: ComponentFixture<DetailsEvenementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsEvenementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsEvenementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
