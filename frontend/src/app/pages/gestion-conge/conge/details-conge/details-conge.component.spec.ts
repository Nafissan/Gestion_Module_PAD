import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCongeComponent } from './details-conge.component';

describe('DetailsCongeComponent', () => {
  let component: DetailsCongeComponent;
  let fixture: ComponentFixture<DetailsCongeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsCongeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsCongeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
