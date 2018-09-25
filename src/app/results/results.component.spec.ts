import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatProgressSpinnerModule, MatTableModule } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ResultService } from '../services/result.service';
import { WinnerService } from '../services/winner.service';

import { ResultsComponent, RaceInfo } from './results.component';

class MockResultService {
  getResultsByYear() {
    return of({
      'MRData': {
        'RaceTable': {
          'Races': [
            {
              'round': 'sample round',
              'raceName': 'sample race',
              'Circuit': {
                'circuitName': 'sample track',
                'url': 'sample trackUrl',
              },
              'url': 'sample raceUrl',
              'date': 'sample date',
              'Results': [
                {
                  'Driver': {
                    'givenName': 'sample givenName',
                    'familyName': 'sample familyName',
                    'driverId': 'sample driverId',
                    'url': 'sample winnerUrl'
                  },
                  'Time': {
                    'time': 'sample time'
                  }
                }
              ]
            },
            {
              'round': 'sample round 2',
              'raceName': 'sample race 2',
              'Circuit': {
                'circuitName': 'sample track 2',
                'url': 'sample trackUrl 2',
              },
              'url': 'sample raceUrl 2',
              'date': 'sample date 2',
              'Results': [
                {
                  'Driver': {
                    'givenName': 'sample givenName 2',
                    'familyName': 'sample familyName 2',
                    'driverId': 'sample driverId 2',
                    'url': 'sample winnerUrl 2'
                  },
                  'Time': {
                    'time': 'sample time 2'
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

class MockWinnerService {
  getWinner() {
    return of('sampleWinnerId');
  }
}

describe('ResultsComponent', () => {
  let component: ResultsComponent;
  let fixture: ComponentFixture<ResultsComponent>;
  let getWinnerSpy: jasmine.Spy;

  beforeEach(async(() => {
    const route = ({ params: of({ year: 2010 }) } as any) as ActivatedRoute;

    TestBed.configureTestingModule({
      declarations: [ ResultsComponent ],
      imports: [ RouterTestingModule, MatProgressSpinnerModule, MatTableModule, HttpClientTestingModule ],
      providers: [
        { provide: ActivatedRoute, useValue: route },
        { provide: ResultService, useClass: MockResultService },
        { provide: WinnerService, useClass: MockWinnerService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    getWinnerSpy = spyOn(MockWinnerService.prototype, 'getWinner').and.callThrough();

    fixture = TestBed.createComponent(ResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load the data', () => {
    expect(component.isLoading).toBeFalsy();
    expect(component.showResults).toBeTruthy();
    expect(component.showError).toBeFalsy();

    expect(component.racesDataSource.data).toEqual(new MatTableDataSource(<RaceInfo[]>
      [
        {
          round: 'sample round',
          raceName: 'sample race',
          trackName: 'sample track',
          trackUrl: 'sample trackUrl',
          raceUrl: 'sample raceUrl',
          date: 'sample date',
          winnerName: 'sample givenName sample familyName',
          winnerUrl: 'sample winnerUrl',
          winnerId: 'sample driverId',
          time: 'sample time'
        },
        {
          round: 'sample round 2',
          raceName: 'sample race 2',
          trackName: 'sample track 2',
          trackUrl: 'sample trackUrl 2',
          raceUrl: 'sample raceUrl 2',
          date: 'sample date 2',
          winnerName: 'sample givenName 2 sample familyName 2',
          winnerUrl: 'sample winnerUrl 2',
          winnerId: 'sample driverId 2',
          time: 'sample time 2'
        }
      ]
    ).data);
  });

  it('should get the winner', () => {
    expect(getWinnerSpy).toHaveBeenCalled();
    expect(getWinnerSpy).toHaveBeenCalledTimes(1);
    expect(getWinnerSpy).toHaveBeenCalledWith(2010);
  });

  it('should reload the data on function call', () => {
    const getResultsByYearSpy = spyOn(MockResultService.prototype, 'getResultsByYear').and.callThrough();

    getWinnerSpy.calls.reset();

    component.reloadData();
    expect(getResultsByYearSpy).toHaveBeenCalled();
    expect(getResultsByYearSpy).toHaveBeenCalledTimes(1);
    expect(getResultsByYearSpy).toHaveBeenCalledWith(2010);

    expect(getWinnerSpy).toHaveBeenCalledTimes(1);
  });
});
