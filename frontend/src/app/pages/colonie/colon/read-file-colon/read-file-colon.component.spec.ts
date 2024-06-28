import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadFileColonComponent } from './read-file-colon.component';

describe('ReadFileColonComponent', () => {
  let component: ReadFileColonComponent;
  let fixture: ComponentFixture<ReadFileColonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadFileColonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadFileColonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
