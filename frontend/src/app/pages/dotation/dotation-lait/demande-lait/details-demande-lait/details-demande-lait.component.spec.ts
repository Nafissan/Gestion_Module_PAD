import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDemandeLaitComponent } from './details-demande-lait.component';

describe('DetailsDemandeLaitComponent', () => {
  let component: DetailsDemandeLaitComponent;
  let fixture: ComponentFixture<DetailsDemandeLaitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsDemandeLaitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsDemandeLaitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
