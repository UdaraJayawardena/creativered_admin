import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductPageContentComponent} from './product-page-content.component';

describe('ProductPageContentComponent', () => {
  let component: ProductPageContentComponent;
  let fixture: ComponentFixture<ProductPageContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductPageContentComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPageContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
