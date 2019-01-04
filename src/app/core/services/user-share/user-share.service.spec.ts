import { TestBed } from '@angular/core/testing';

import { UserShareService } from './user-share.service';

describe('UserShareService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserShareService = TestBed.get(UserShareService);
    expect(service).toBeTruthy();
  });
});
