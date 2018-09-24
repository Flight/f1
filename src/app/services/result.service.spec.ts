import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ResultService } from './result.service';

describe('ResultsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResultService],
      imports: [ HttpClientTestingModule ]
    });
  });

  it('should be created', inject([ResultService], (service: ResultService) => {
    expect(service).toBeTruthy();
  }));
});
