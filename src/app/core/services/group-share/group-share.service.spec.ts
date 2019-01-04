import { TestBed } from '@angular/core/testing';

import { GroupShareService } from './group-share.service';

describe('GroupShareService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GroupShareService = TestBed.get(GroupShareService);
    expect(service).toBeTruthy();
  });
});
