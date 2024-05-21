import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsComiteComponent } from './details-comite.component';

describe('DetailsComiteComponent', () => {
  let component: DetailsComiteComponent;
  let fixture: ComponentFixture<DetailsComiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsComiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsComiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
