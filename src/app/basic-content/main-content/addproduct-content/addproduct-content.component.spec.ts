import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AddproductContentComponent} from './addproduct-content.component';

describe('AddproductContentComponent', () => {
  let component: AddproductContentComponent;
  let fixture: ComponentFixture<AddproductContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddproductContentComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddproductContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
