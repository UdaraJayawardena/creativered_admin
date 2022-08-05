import {TestBed} from '@angular/core/testing';

import {PageTitleServiceService} from './page-title-service.service';

describe('PageTitleServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PageTitleServiceService = TestBed.get(PageTitleServiceService);
    expect(service).toBeTruthy();
  });
});
