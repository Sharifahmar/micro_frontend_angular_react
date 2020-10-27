import { TestBed } from '@angular/core/testing';

import { DonarService } from './donar.service';

describe('DonarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DonarService = TestBed.get(DonarService);
    expect(service).toBeTruthy();
  });
});
