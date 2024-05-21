import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportCongeComponent } from './import-conge.component';

describe('ImportCongeComponent', () => {
  let component: ImportCongeComponent;
  let fixture: ComponentFixture<ImportCongeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportCongeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportCongeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
