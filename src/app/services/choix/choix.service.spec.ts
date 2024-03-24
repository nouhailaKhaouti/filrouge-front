import { TestBed } from '@angular/core/testing';

import { ChoixService } from './choix.service';

describe('ChoixService', () => {
  let service: ChoixService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChoixService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
