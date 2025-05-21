import { TestBed } from '@angular/core/testing';

import { GlassforgeEngineService } from './glassforge-engine.service';

describe('GlassforgeEngineService', () => {
  let service: GlassforgeEngineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlassforgeEngineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
