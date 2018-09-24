import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class PageTitleService {
  basicTitle: string;

  constructor(private title: Title) {
    this.basicTitle = title.getTitle();
  }

  public setDefaultTitle(): void {
    this.title.setTitle(this.basicTitle);
  }

  public setYear(year: number): void {
    this.title.setTitle(`${year.toString()} ${this.basicTitle}`);
  }
}
