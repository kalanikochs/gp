import { TestBed } from '@angular/core/testing';

import { StatusBarService } from './statusBar.service';

describe('StatusBarService', () => {
  let service: StatusBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatusBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
