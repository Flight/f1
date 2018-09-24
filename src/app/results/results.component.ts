import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PageTitleService } from '../services/page-title.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  public year: number;

  constructor(private router: Router, private route: ActivatedRoute, private pageTitleService: PageTitleService) {
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

  private changeYear(year: number): void {
    this.year = year;
    this.pageTitleService.setYear(this.year);
  }

  ngOnInit() { }
}
