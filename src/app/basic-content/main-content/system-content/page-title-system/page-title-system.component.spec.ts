import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PageTitleSystemComponent} from './page-title-system.component';

describe('PageTitleSystemComponent', () => {
  let component: PageTitleSystemComponent;
  let fixture: ComponentFixture<PageTitleSystemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PageTitleSystemComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageTitleSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
