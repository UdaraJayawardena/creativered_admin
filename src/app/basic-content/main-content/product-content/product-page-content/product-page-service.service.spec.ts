import {TestBed} from '@angular/core/testing';

import {ProductPageServiceService} from './product-page-service.service';

describe('ProductPageServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductPageServiceService = TestBed.get(ProductPageServiceService);
    expect(service).toBeTruthy();
  });
});
