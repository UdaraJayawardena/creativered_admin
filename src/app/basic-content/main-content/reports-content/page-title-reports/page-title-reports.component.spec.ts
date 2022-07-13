import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PageTitleReportsComponent} from './page-title-reports.component';

describe('PageTitleReportsComponent', () => {
  let component: PageTitleReportsComponent;
  let fixture: ComponentFixture<PageTitleReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PageTitleReportsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageTitleReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
