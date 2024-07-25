import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTiragePelerinageComponent } from './list-tirage-pelerinage.component';

describe('ListTiragePelerinageComponent', () => {
  let component: ListTiragePelerinageComponent;
  let fixture: ComponentFixture<ListTiragePelerinageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTiragePelerinageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTiragePelerinageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
