import { TestBed, inject, ComponentFixture } from '@angular/core/testing';

import { ResultService } from './result.service';
import { WinnerService } from './winner.service';

import { of } from 'rxjs';

class MockResultService {
  getDriverStandingsByYear() {
    return of({
      'MRData': {
        'StandingsTable': {
          'StandingsLists': [
            {
              'DriverStandings': [
                {
                  'Driver': {
                    'driverId': 'mockedDriverId'
                  }
                }
              ]
            }
          ]
        }
      }
    });
  }
}

describe('WinnerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WinnerService,
        { provide: ResultService, useClass: MockResultService}
      ]
    });
  });

  it('should be created', inject([WinnerService], (service: WinnerService) => {
    expect(service).toBeTruthy();
  }));

  it('should add and retrieve the winner', inject([WinnerService], (service: WinnerService): void => {
      service.addWinner(2005, 'testWinner');
      service.getWinner(2005).subscribe((winnerId: string) => {
        expect(winnerId).toEqual('testWinner');
      });
  }));

  it('should replace the winner with the new one', inject([WinnerService], (service: WinnerService): void => {
      service.addWinner(2005, 'newWinner');
      service.getWinner(2005).subscribe((winnerId: string) => {
        expect(winnerId).toEqual('newWinner');
      });
  }));

  it('should call the result service if no winner cached', (done: DoneFn): void => {
    localStorage.removeItem('winnersCache');

    inject([WinnerService], (service: WinnerService): void => {
      const getByYearSpy = spyOn(MockResultService.prototype, 'getDriverStandingsByYear').and.callThrough();

      service.getWinner(2006).subscribe((winnerId: string) => {
        expect(getByYearSpy).toHaveBeenCalled();
        expect(getByYearSpy).toHaveBeenCalledWith(2006);
        expect(winnerId).toEqual('mockedDriverId');
        done();
      });
    })();
  });
});
