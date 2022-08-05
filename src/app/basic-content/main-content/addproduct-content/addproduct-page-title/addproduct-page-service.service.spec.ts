import {TestBed} from '@angular/core/testing';

import {AddproductPageServiceService} from './addproduct-page-service.service';

describe('AddproductPageServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddproductPageServiceService = TestBed.get(AddproductPageServiceService);
    expect(service).toBeTruthy();
  });
});
