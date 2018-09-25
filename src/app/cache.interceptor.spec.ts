import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule, HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { RequestCacheService } from './services/request-cache.service';
import { CachingInterceptor } from './cache.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

class MockedRequestCacheService {
  get(request: HttpRequest<any>) {
    if (request.url === 'cachedUrl') {
      return new HttpResponse({
        body: 'test body'
      });
    }
  }
  put() { }
}

describe('CachingInterceptor', () => {
  beforeEach(() => {
    localStorage.removeItem('requestsCache');

    TestBed.configureTestingModule({
      imports: [ HttpClientModule, HttpClientTestingModule ],
      providers: [
        { provide: RequestCacheService, useClass: MockedRequestCacheService },
        { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true},
      ]
    });
  });

  it('should do the request if cache returns undefined and put it to cache', (done: DoneFn) => {
    const requestCacheGetSpy = spyOn(MockedRequestCacheService.prototype, 'get').and.callThrough();
    const requestCachePutSpy = spyOn(MockedRequestCacheService.prototype, 'put').and.callThrough();

    inject([HttpTestingController, HttpClient], (httpMock: HttpTestingController, httpClient: HttpClient) => {
      let req;

      httpClient.get('testUrl').subscribe(() => {
        expect(requestCacheGetSpy).toHaveBeenCalled();
        expect(requestCacheGetSpy).toHaveBeenCalledTimes(1);
        expect(requestCacheGetSpy).toHaveBeenCalledWith(new HttpRequest('GET', 'testUrl'));

        expect(requestCachePutSpy).toHaveBeenCalled();
        expect(requestCachePutSpy).toHaveBeenCalledTimes(1);
        expect(requestCachePutSpy).toHaveBeenCalledWith(new HttpRequest('GET', 'testUrl'), new HttpResponse({
          body: 'test url response',
          url: 'testUrl'
        }));

        done();
      });

      req = httpMock.expectOne('testUrl');
      expect(req.request.method).toBe('GET');
      req.flush('test url response');
    })();
  });

  it('should get the cached data if the request was cached', (done: DoneFn) => {
    inject([HttpTestingController, HttpClient], (httpMock: HttpTestingController, httpClient: HttpClient) => {
      httpClient.get('cachedUrl').subscribe((data: string) => {
        expect(data).toEqual('test body');

        done();
      });

      httpMock.expectNone('cachedUrl');
    })();
  });
});
