import { TestBed } from '@angular/core/testing';

import { DeckFormService } from './deck-form.service';

describe('DeckFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeckFormService = TestBed.get(DeckFormService);
    expect(service).toBeTruthy();
  });
});
