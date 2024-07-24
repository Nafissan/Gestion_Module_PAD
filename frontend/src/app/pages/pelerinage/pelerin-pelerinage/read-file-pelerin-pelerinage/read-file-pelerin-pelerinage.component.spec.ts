import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadFilePelerinPelerinageComponent } from './read-file-pelerin-pelerinage.component';

describe('ReadFilePelerinPelerinageComponent', () => {
  let component: ReadFilePelerinPelerinageComponent;
  let fixture: ComponentFixture<ReadFilePelerinPelerinageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadFilePelerinPelerinageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadFilePelerinPelerinageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
