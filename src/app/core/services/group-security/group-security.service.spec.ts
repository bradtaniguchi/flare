import { TestBed } from '@angular/core/testing';

import { GroupSecurityService } from './group-security.service';

describe('GroupSecurityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GroupSecurityService = TestBed.get(GroupSecurityService);
    expect(service).toBeTruthy();
  });
});
