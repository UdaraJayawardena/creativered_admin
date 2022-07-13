import {TestBed} from '@angular/core/testing';

import {ReportsServiceService} from '../../../services/reports-service.service';

describe('ReportsServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReportsServiceService = TestBed.get(ReportsServiceService);
    expect(service).toBeTruthy();
  });
});
