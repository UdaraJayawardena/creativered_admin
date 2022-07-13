import {TestBed} from '@angular/core/testing';

import {FooterServiceService} from '../../services/footer-service.service';

describe('FooterServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FooterServiceService = TestBed.get(FooterServiceService);
    expect(service).toBeTruthy();
  });
});
