import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DirectForgetComponent} from './direct-forget.component';

describe('DirectForgetComponent', () => {
  let component: DirectForgetComponent;
  let fixture: ComponentFixture<DirectForgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DirectForgetComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectForgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
