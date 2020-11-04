import { TestBed } from '@angular/core/testing';

import { ServiceInventoryService } from './service-inventory.service';

describe('ServiceInventoryService', () => {
  let service: ServiceInventoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceInventoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
