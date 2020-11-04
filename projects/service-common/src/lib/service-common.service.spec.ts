import { TestBed } from '@angular/core/testing';

import { ServiceCommonService } from './service-common.service';

describe('ServiceCommonService', () => {
  let service: ServiceCommonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceCommonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
