import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { PageTitleService } from '../services/page-title.service';

import { ResultService } from '../services/result.service';
import { YearResults, Race } from '../services/year-results.type';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  public year: number;
  public showResults = false;
  public isLoading = false;
  public races: Array<any> = [];

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
    this.pageTitleService.setDefaultTitle();
    this.router.navigate(['seasons']);
  }

  private getResults(): void {
    this.races = [];

    this.resultService.getResultsByYear(this.year).pipe(
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe((data: YearResults) => {
      const races = data.MRData.RaceTable.Races;

      races.forEach((race: Race): void => {
        const result = race.Results[0];

        this.races.push({
          round: race.round,
          raceName: race.raceName,
          date: race.date,
          winnerName: `${result.Driver.givenName} ${result.Driver.familyName}`,
          time: result.Time.time
        });
      });

      this.showResults = true;
    });
  }

  private changeYear(year: number): void {
    this.isLoading = true;
    this.showResults = false;
    this.year = year;
    this.pageTitleService.setYear(this.year);
    this.getResults();
  }

  ngOnInit() {
  }
}
