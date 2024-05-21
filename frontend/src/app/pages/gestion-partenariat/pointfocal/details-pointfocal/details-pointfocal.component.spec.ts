import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPointfocalComponent } from './details-pointfocal.component';

describe('DetailsPointfocalComponent', () => {
  let component: DetailsPointfocalComponent;
  let fixture: ComponentFixture<DetailsPointfocalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsPointfocalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsPointfocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
