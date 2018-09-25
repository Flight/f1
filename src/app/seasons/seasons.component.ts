import { Component, OnInit, OnDestroy } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { ResultService } from '../services/result.service';
import { DriverStandings, StandingsList } from '../services/driver-standings.type';
import { WinnerService } from '../services/winner.service';

export interface Season {
  year: number;
  winnerName: string;
}

@Component({
  selector: 'app-seasons',
  templateUrl: './seasons.component.html',
  styleUrls: ['./seasons.component.scss']
})
export class SeasonsComponent implements OnInit, OnDestroy {
  public seasons: Array<Season> = [];
  public isLoading = false;
  public showSeasons = false;
  public showError = false;

  constructor(private resultService: ResultService, private winnerService: WinnerService) { }

  private getDriverStanding(): void {
    this.showError = false;
    this.isLoading = true;
    this.resultService.getDriverStandings(2005, 11).pipe(
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe((data: DriverStandings) => {
      const standingsLists = data.MRData.StandingsTable.StandingsLists;

      standingsLists.forEach((standingsList: StandingsList) => {
        const driver = standingsList.DriverStandings[0].Driver;

        this.seasons.push({
          year: parseInt(standingsList.season, 10),
          winnerName: `${driver.givenName} ${driver.familyName}`
        });
        this.winnerService.addWinner(parseInt(standingsList.season, 10), driver.driverId);
      });

      this.showSeasons = true;
    }, () => {
      this.showError = true;
    });
  }

  public reloadData() {
    this.getDriverStanding();
  }

  ngOnInit() {
    this.getDriverStanding();
  }

  ngOnDestroy() {
    this.seasons = [];
    this.isLoading = false;
    this.showSeasons = false;
    this.showError = false;
  }
}
