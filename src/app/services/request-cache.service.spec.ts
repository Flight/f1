import { TestBed, inject } from '@angular/core/testing';

import { RequestCacheService } from './request-cache.service';
import { HttpRequest, HttpResponse } from '@angular/common/http';

describe('RequestCacheService', () => {
  beforeEach(() => {
    localStorage.removeItem('requestsCache');

    TestBed.configureTestingModule({
      providers: [ RequestCacheService ]
    });
  });

  it('should be created', inject([RequestCacheService], (service: RequestCacheService) => {
    expect(service).toBeTruthy();
  }));

  it('should return undefined if there is no cached response', inject([RequestCacheService], (service: RequestCacheService) => {
    let response: HttpResponse<any>;
    const request = new HttpRequest('GET', 'testUrl');

    response = service.get(request);

    expect(response).toBeUndefined();
  }));

  it('should save and retrieve the request data from cache', inject([RequestCacheService], (service: RequestCacheService) => {
    let response: HttpResponse<any>;
    const request = new HttpRequest('GET', 'testUrl1');

    service.put(request, new HttpResponse({
      body: 'testBody'
    }));

    response = service.get(request);

    expect(response.body).toEqual('testBody');
  }));
});
