import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsVilleComponent } from './details-ville.component';

describe('DetailsVilleComponent', () => {
  let component: DetailsVilleComponent;
  let fixture: ComponentFixture<DetailsVilleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsVilleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsVilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
