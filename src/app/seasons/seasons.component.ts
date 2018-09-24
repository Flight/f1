import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { ResultService } from '../services/result.service';
import { DriverStandings, StandingsList } from '../services/driver-standings.type';

export interface Season {
  year: string;
  winnerName: string;
}

@Component({
  selector: 'app-seasons',
  templateUrl: './seasons.component.html',
  styleUrls: ['./seasons.component.scss']
})
export class SeasonsComponent implements OnInit {
  public seasons: Array<Season> = [];
  public isLoading = false;
  public showSeasons = false;

  constructor(private resultService: ResultService) { }

  private getDriverStanding(): void {
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
          year: standingsList.season,
          winnerName: `${driver.givenName} ${driver.familyName}`
        });
      });

      this.showSeasons = true;
    });
  }

  ngOnInit() {
    this.getDriverStanding();
  }
}
