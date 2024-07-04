import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsSatisfactionComponent } from './details-satisfaction.component';

describe('DetailsSatisfactionComponent', () => {
  let component: DetailsSatisfactionComponent;
  let fixture: ComponentFixture<DetailsSatisfactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsSatisfactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsSatisfactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
