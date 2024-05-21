import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsMembreComponent } from './details-membre.component';

describe('DetailsMembreComponent', () => {
  let component: DetailsMembreComponent;
  let fixture: ComponentFixture<DetailsMembreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsMembreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsMembreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
