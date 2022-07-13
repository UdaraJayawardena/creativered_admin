import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AddproductPageTitleComponent} from './addproduct-page-title.component';

describe('AddproductPageTitleComponent', () => {
  let component: AddproductPageTitleComponent;
  let fixture: ComponentFixture<AddproductPageTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddproductPageTitleComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddproductPageTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
