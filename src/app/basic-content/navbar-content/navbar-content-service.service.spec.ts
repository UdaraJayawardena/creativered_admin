import {TestBed} from '@angular/core/testing';

import {NavbarContentServiceService} from '../../services/navbar-content-service.service';

describe('NavbarContentServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NavbarContentServiceService = TestBed.get(NavbarContentServiceService);
    expect(service).toBeTruthy();
  });
});
