import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { WinnerService } from './winner.service';

describe('WinnerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ WinnerService ],
      imports: [ HttpClientTestingModule ]
    });
  });

  it('should be created', inject([WinnerService], (service: WinnerService) => {
    expect(service).toBeTruthy();
  }));
});
