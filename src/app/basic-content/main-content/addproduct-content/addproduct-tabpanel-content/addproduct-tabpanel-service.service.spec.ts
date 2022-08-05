import {TestBed} from '@angular/core/testing';

import {AddproductTabpanelServiceService} from './addproduct-tabpanel-service.service';

describe('AddproductTabpanelServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddproductTabpanelServiceService = TestBed.get(AddproductTabpanelServiceService);
    expect(service).toBeTruthy();
  });
});
