import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPaysComponent } from './details-pays.component';

describe('DetailsPaysComponent', () => {
  let component: DetailsPaysComponent;
  let fixture: ComponentFixture<DetailsPaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsPaysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsPaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
