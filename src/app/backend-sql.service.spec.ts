import { TestBed } from '@angular/core/testing';

import { BackendSqlService } from './backend-sql.service';

describe('BackendSqlService', () => {
  let service: BackendSqlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackendSqlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
