import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductTableDetailComponent} from './product-table-detail.component';

describe('ProductTableDetailComponent', () => {
  let component: ProductTableDetailComponent;
  let fixture: ComponentFixture<ProductTableDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductTableDetailComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductTableDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
