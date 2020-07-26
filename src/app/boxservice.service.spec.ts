import { TestBed } from '@angular/core/testing';

import { BoxserviceService } from './boxservice.service';

describe('BoxserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BoxserviceService = TestBed.get(BoxserviceService);
    expect(service).toBeTruthy();
  });
});
