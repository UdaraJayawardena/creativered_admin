import {TestBed} from '@angular/core/testing';

import {CustomerAccountsServiceService} from '../../../services/customer-accounts-service.service';

describe('CustomerAccountsServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomerAccountsServiceService = TestBed.get(CustomerAccountsServiceService);
    expect(service).toBeTruthy();
  });
});
