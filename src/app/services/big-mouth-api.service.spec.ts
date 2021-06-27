import { TestBed } from '@angular/core/testing';

import { BigMouthApiService } from './big-mouth-api.service';

describe('BigMouthApiService', () => {
  let service: BigMouthApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BigMouthApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
