import { TestBed } from '@angular/core/testing';

import { DonarserviceService } from './donarservice.service';

describe('DonarserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DonarserviceService = TestBed.get(DonarserviceService);
    expect(service).toBeTruthy();
  });
});
