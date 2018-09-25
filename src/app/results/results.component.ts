import { Component, OnInit, OnDestroy } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

import { PageTitleService } from '../services/page-title.service';
import { ResultService } from '../services/result.service';
import { WinnerService } from '../services/winner.service';
import { YearResults, Race } from '../services/year-results.type';

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
  public showError = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pageTitleService: PageTitleService,
    private resultService: ResultService,
    private winnerService: WinnerService
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
    this.showError = false;

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
    }, () => {
      this.showError = true;
    });
  }

  private getSeasonWinner(): void {
    this.winnerService.getWinner(this.year).subscribe((winnerId: string): void => {
      this.seasonWinnerId = winnerId;
    }, () => {});
  }

  private changeYear(year: number): void {
    this.showError = false;
    this.isLoading = true;
    this.showResults = false;
    this.year = year;
    this.pageTitleService.setYear(this.year);
    this.getResults();
    this.getSeasonWinner();
  }

  public reloadData() {
    this.changeYear(this.year);
  }

  ngOnInit() {
    this.pageTitleService.setYear(this.year);
  }

  ngOnDestroy() {
    this.showError = false;
    this.isLoading = false;
    this.showResults = false;
    this.year = undefined;
    this.racesDataSource = undefined;
    this.seasonWinnerId = undefined;
    this.pageTitleService.setDefaultTitle();
  }
}
