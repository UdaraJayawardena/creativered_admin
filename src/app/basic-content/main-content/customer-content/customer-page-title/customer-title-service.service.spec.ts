import {TestBed} from '@angular/core/testing';

import {CustomerTitleServiceService} from './customer-title-service.service';

describe('CustomerTitleServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomerTitleServiceService = TestBed.get(CustomerTitleServiceService);
    expect(service).toBeTruthy();
  });
});
