import { TestBed } from '@angular/core/testing';

import { CdineshStaticPagesService } from './cdinesh-static-pages.service';

describe('CdineshStaticPagesService', () => {
  let service: CdineshStaticPagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CdineshStaticPagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
