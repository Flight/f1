import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DriverStandigs } from './driver-standings.type';
import { YearResults } from './year-results.type';

@Injectable({
  providedIn: 'root'
})
export class ResultService {
  baseUrl = '//ergast.com/api/f1';

  constructor(private http: HttpClient) { }

  getDriverStandings(startYear: number = 1950, limit: number = 100): Observable<DriverStandigs> {
    const offset = startYear - 1950;
    return this.http.get<DriverStandigs>(`${this.baseUrl}/driverstandings/1.json?offset=${offset}&limit=${limit}`);
  }

  getResultsByYear(year: number, limit: number = 100): Observable<YearResults> {
    return this.http.get<YearResults>(`${this.baseUrl}/${year}/results/1.json?limit=${limit}`);
  }
}
