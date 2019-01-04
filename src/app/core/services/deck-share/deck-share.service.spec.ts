import { TestBed } from '@angular/core/testing';

import { DeckShareService } from './deck-share.service';

describe('DeckShareService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeckShareService = TestBed.get(DeckShareService);
    expect(service).toBeTruthy();
  });
});
