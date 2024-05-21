import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageLayoutDemoContentComponent } from './page-layout-demo-content.component';

describe('PageLayoutContentComponent', () => {
  let component: PageLayoutDemoContentComponent;
  let fixture: ComponentFixture<PageLayoutDemoContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PageLayoutDemoContentComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageLayoutDemoContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
