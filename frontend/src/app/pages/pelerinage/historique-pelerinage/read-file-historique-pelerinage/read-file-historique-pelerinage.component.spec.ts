import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadFileHistoriquePelerinageComponent } from './read-file-historique-pelerinage.component';

describe('ReadFileHistoriquePelerinageComponent', () => {
  let component: ReadFileHistoriquePelerinageComponent;
  let fixture: ComponentFixture<ReadFileHistoriquePelerinageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadFileHistoriquePelerinageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadFileHistoriquePelerinageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
