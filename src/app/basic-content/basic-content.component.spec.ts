import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BasicContentComponent} from './basic-content.component';

describe('BasicContentComponent', () => {
  let component: BasicContentComponent;
  let fixture: ComponentFixture<BasicContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BasicContentComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
