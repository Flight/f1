import { Component, OnInit, OnDestroy } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

import { PageTitleService } from '../services/page-title.service';
import { ResultService } from '../services/result.service';
import { YearResults, Race } from '../services/year-results.type';
import { DriverStandings } from '../services/driver-standings.type';

export interface RaceInfo {
  round: string;
  raceName: string;
  trackName: string;
  trackUrl: string;
  raceUrl: string;
  date: string;
  winnerName: string;
  winnerUrl: string;
  winnerId: string;
  time: string;
}

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit, OnDestroy {
  public year: number;
  public showResults = false;
  public isLoading = false;
  public racesDataSource: MatTableDataSource<RaceInfo>;
  public displayedColumns: string[] = ['round', 'raceName', 'trackName', 'date',  'winnerName',  'time'];
  public seasonWinnerId: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pageTitleService: PageTitleService,
    private resultService: ResultService
  ) {
    const currentDate = new Date();

    this.route.params.subscribe((params) => {
      const year = parseInt(params.year, 10);

      if (year !== NaN && year > 1949 && year < currentDate.getUTCFullYear() + 1) {
        this.changeYear(year);
      } else {
        this.navigateHome();
      }
    });
  }

  private navigateHome(): void {
    this.router.navigate(['seasons']);
  }

  private getResults(): void {
    this.resultService.getResultsByYear(this.year).pipe(
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe((data: YearResults) => {
      const racesData = data.MRData.RaceTable.Races;
      const racesInfo: Array<RaceInfo> = [];

      racesData.forEach((race: Race): void => {
        const result = race.Results[0];

        racesInfo.push({
          round: race.round,
          raceName: race.raceName,
          trackName: race.Circuit.circuitName,
          trackUrl: race.Circuit.url,
          raceUrl: race.url,
          date: race.date,
          winnerName: `${result.Driver.givenName} ${result.Driver.familyName}`,
          winnerId: result.Driver.driverId,
          winnerUrl: result.Driver.url,
          time: result.Time.time
        });
      });

      this.racesDataSource = new MatTableDataSource<RaceInfo>(racesInfo);
      this.showResults = true;
    });
  }

  private getSeasonWinner(): void {
    this.resultService.getWinnersByYear(this.year).subscribe((driverStandings: DriverStandings): void => {
      this.seasonWinnerId = driverStandings.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver.driverId;
    });
  }

  private changeYear(year: number): void {
    this.isLoading = true;
    this.showResults = false;
    this.year = year;
    this.pageTitleService.setYear(this.year);
    this.getResults();
    this.getSeasonWinner();
  }

  ngOnInit() {
    this.pageTitleService.setYear(this.year);
  }

  ngOnDestroy() {
    this.pageTitleService.setDefaultTitle();
  }
}
