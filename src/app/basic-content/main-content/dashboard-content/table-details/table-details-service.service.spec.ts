import {TestBed} from '@angular/core/testing';

import {TableDetailsServiceService} from './table-details-service.service';

describe('TableDetailsServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TableDetailsServiceService = TestBed.get(TableDetailsServiceService);
    expect(service).toBeTruthy();
  });
});
