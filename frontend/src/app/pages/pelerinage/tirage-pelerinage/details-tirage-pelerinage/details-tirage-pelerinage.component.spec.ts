import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTiragePelerinageComponent } from './details-tirage-pelerinage.component';

describe('DetailsTiragePelerinageComponent', () => {
  let component: DetailsTiragePelerinageComponent;
  let fixture: ComponentFixture<DetailsTiragePelerinageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsTiragePelerinageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsTiragePelerinageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
