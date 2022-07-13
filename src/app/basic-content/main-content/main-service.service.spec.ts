import {TestBed} from '@angular/core/testing';

import {MainServiceService} from '../../services/main-service.service';

describe('MainServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MainServiceService = TestBed.get(MainServiceService);
    expect(service).toBeTruthy();
  });
});
