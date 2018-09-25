/// <reference types="@types/jasmine-ajax" />

import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { ResultService } from './result.service';

describe('ResultsService', () => {
  const dataUrlRegExp = /\/\/ergast\.com\/api\/f1/;

  beforeEach(() => {
    jasmine.Ajax.install();
    jasmine.Ajax.stubRequest(dataUrlRegExp).andReturn({
      status: 200,
      responseText: ''
    });

    TestBed.configureTestingModule({
      providers: [ ResultService ],
      imports: [ HttpClientModule ]
    });
  });

  afterEach(() => {
    jasmine.Ajax.uninstall();
  });

  it('should be created', inject([ResultService], (service: ResultService) => {
    expect(service).toBeTruthy();
  }));

  it('should send the driver standings request', (done: DoneFn): void => {
    inject([ResultService], (service: ResultService) => {
      service.getDriverStandings(2005, 30).subscribe((): void => {
          expect(jasmine.Ajax.requests.count()).toBe(1);
          expect(jasmine.Ajax.requests.mostRecent().url).toBe('//ergast.com/api/f1/driverstandings/1.json?offset=55&limit=30');
          done();
      });
    })();
  });

  it('should send the driver standings request without start year', (done: DoneFn): void => {
    inject([ResultService], (service: ResultService) => {
      service.getDriverStandings(undefined, 30).subscribe((): void => {
          expect(jasmine.Ajax.requests.count()).toBe(1);
          expect(jasmine.Ajax.requests.mostRecent().url).toBe('//ergast.com/api/f1/driverstandings/1.json?offset=0&limit=30');
          done();
      });
    })();
  });

  it('should send the driver standings request without start year and limit', (done: DoneFn): void => {
    inject([ResultService], (service: ResultService) => {
      service.getDriverStandings().subscribe((): void => {
          expect(jasmine.Ajax.requests.count()).toBe(1);
          expect(jasmine.Ajax.requests.mostRecent().url).toBe('//ergast.com/api/f1/driverstandings/1.json?offset=0&limit=100');
          done();
      });
    })();
  });

  it('should send the rase results request by year', (done: DoneFn): void => {
    inject([ResultService], (service: ResultService) => {
      service.getResultsByYear(2010, 40).subscribe((): void => {
          expect(jasmine.Ajax.requests.count()).toBe(1);
          expect(jasmine.Ajax.requests.mostRecent().url).toBe('//ergast.com/api/f1/2010/results/1.json?limit=40');
          done();
      });
    })();
  });

  it('should send the rase results request by year without limit', (done: DoneFn): void => {
    inject([ResultService], (service: ResultService) => {
      service.getResultsByYear(2010).subscribe((): void => {
          expect(jasmine.Ajax.requests.count()).toBe(1);
          expect(jasmine.Ajax.requests.mostRecent().url).toBe('//ergast.com/api/f1/2010/results/1.json?limit=100');
          done();
      });
    })();
  });

  it('should send the driver standings request by year', (done: DoneFn): void => {
    inject([ResultService], (service: ResultService) => {
      service.getDriverStandingsByYear(2010, 99).subscribe((): void => {
          expect(jasmine.Ajax.requests.count()).toBe(1);
          expect(jasmine.Ajax.requests.mostRecent().url).toBe('//ergast.com/api/f1/2010/driverStandings.json?limit=99');
          done();
      });
    })();
  });

  it('should send the driver standings request by year without limit', (done: DoneFn): void => {
    inject([ResultService], (service: ResultService) => {
      service.getDriverStandingsByYear(2010).subscribe((): void => {
          expect(jasmine.Ajax.requests.count()).toBe(1);
          expect(jasmine.Ajax.requests.mostRecent().url).toBe('//ergast.com/api/f1/2010/driverStandings.json?limit=1');
          done();
      });
    })();
  });
});
