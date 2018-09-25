import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatProgressSpinnerModule } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ResultService } from '../services/result.service';
import { WinnerService } from '../services/winner.service';

import { SeasonsComponent, Season } from './seasons.component';

class MockResultService {
  getDriverStandings() {
    return of({
      'MRData': {
        'StandingsTable': {
          'StandingsLists': [
            {
              'season': 2005,
              'DriverStandings': [
                {
                  'Driver': {
                    'givenName': 'givenName5',
                    'familyName': 'familyName5',
                    'driverId': 'driver5'
                  }
                }
              ]
            },
            {
              'season': 2006,
              'DriverStandings': [
                {
                  'Driver': {
                    'givenName': 'givenName6',
                    'familyName': 'familyName6',
                    'driverId': 'driver6'
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
  addWinner() { }
}

describe('SeasonsComponent', () => {
  let component: SeasonsComponent;
  let fixture: ComponentFixture<SeasonsComponent>;
  let addWinnerSpy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeasonsComponent ],
      imports: [ MatProgressSpinnerModule, RouterTestingModule, HttpClientTestingModule ],
      providers: [
        { provide: ResultService, useClass: MockResultService },
        { provide: WinnerService, useClass: MockWinnerService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    addWinnerSpy = spyOn(MockWinnerService.prototype, 'addWinner').and.callThrough();
    fixture = TestBed.createComponent(SeasonsComponent);
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
    expect(component.showSeasons).toBeTruthy();
    expect(component.showError).toBeFalsy();

    expect(component.seasons).toEqual(<Season[]>[
      {
        year: 2005,
        winnerName: `givenName5 familyName5`
      },
      {
        year: 2006,
        winnerName: `givenName6 familyName6`
      }
    ]);
  });

  it('should save the winners', () => {
    expect(addWinnerSpy).toHaveBeenCalled();
    expect(addWinnerSpy).toHaveBeenCalledTimes(2);
    expect(addWinnerSpy).toHaveBeenCalledWith(2005, 'driver5');
    expect(addWinnerSpy).toHaveBeenCalledWith(2006, 'driver6');
  });

  it('should reload the data on function call', () => {
    const getDriverStandingsSpy = spyOn(MockResultService.prototype, 'getDriverStandings').and.callThrough();

    component.reloadData();
    expect(getDriverStandingsSpy).toHaveBeenCalled();
    expect(getDriverStandingsSpy).toHaveBeenCalledTimes(1);
    expect(getDriverStandingsSpy).toHaveBeenCalledWith(2005, 11);
  });
});
