import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoindrePhotoComponent } from './joindre-photo.component';

describe('JoindrePvComponent', () => {
  let component: JoindrePhotoComponent;
  let fixture: ComponentFixture<JoindrePhotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoindrePhotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoindrePhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
