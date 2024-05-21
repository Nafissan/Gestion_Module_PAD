import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDomaineComponent } from './details-domaine.component';

describe('DetailsDomaineComponent', () => {
  let component: DetailsDomaineComponent;
  let fixture: ComponentFixture<DetailsDomaineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsDomaineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsDomaineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
