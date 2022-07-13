import {TestBed} from '@angular/core/testing';

import {AddproductServiceService} from '../../../services/addproduct-service.service';

describe('AddproductServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddproductServiceService = TestBed.get(AddproductServiceService);
    expect(service).toBeTruthy();
  });
});
