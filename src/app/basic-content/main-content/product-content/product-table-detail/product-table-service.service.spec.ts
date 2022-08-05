import {TestBed} from '@angular/core/testing';

import {ProductTableServiceService} from './product-table-service.service';

describe('ProductTableServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductTableServiceService = TestBed.get(ProductTableServiceService);
    expect(service).toBeTruthy();
  });
});
