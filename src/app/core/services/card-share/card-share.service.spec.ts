import { TestBed } from '@angular/core/testing';

import { CardShareService } from './card-share.service';

describe('CardShareService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CardShareService = TestBed.get(CardShareService);
    expect(service).toBeTruthy();
  });
});
