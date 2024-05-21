import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoirMembreComponent } from './voir-membre.component';

describe('VoirMembreComponent', () => {
  let component: VoirMembreComponent;
  let fixture: ComponentFixture<VoirMembreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoirMembreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoirMembreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
