import { Injectable } from '@angular/core';
import { ResultService } from '../services/result.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DriverStandings } from './driver-standings.type';

export interface CacheItem {
  year: number;
  winnerId: string;
  updated: number;
}

@Injectable({
  providedIn: 'root'
})
export class WinnerService {
  maxAge = 1000 * 60 * 10; // 10 minutes caching
  cache: Array<CacheItem> = [];

  constructor(private resultService: ResultService) {
    const localStorageCache = localStorage.getItem('winnersCache');

    if (!localStorageCache || !localStorageCache.length) {
      return;
    }
    this.cache = JSON.parse(localStorageCache).data;
  }

  getWinner(year: number): Observable<string> {
    const cachedItem = this.cache.find((cacheItem: CacheItem) => cacheItem.year === year);

    if (cachedItem && cachedItem.updated + this.maxAge > Date.now()) {
      return of(cachedItem.winnerId);
    }

    return this.resultService.getDriverStandingsByYear(year).pipe(
      map((driverStandings: DriverStandings) => {
        const winnerId = driverStandings.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver.driverId;

        this.addWinner(year, winnerId);
        return driverStandings.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver.driverId;
      })
    );
  }

  addWinner(year: number, winnerId: string) {
    this.cache = this.cache.filter((cacheItem: CacheItem) => cacheItem.year !== year);

    this.cache.push({
      year,
      winnerId,
      updated: Date.now()
    });

    localStorage.setItem('winnersCache', JSON.stringify({ data: this.cache }));
  }
}
