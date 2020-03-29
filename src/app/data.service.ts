import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Person, Film, Starship, Planet } from './sw.models';
import { Observable, of, Subject } from 'rxjs';
import { map, catchError, timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = 'https://swapi.co/api';

  constructor(private http: HttpClient) { }

  // getPeople(selector: () => {}): Observable<Person[]> {
  getPeople(): Observable<Person[]> {
    const url = `${this.baseUrl}/people`;
    return this.getDataSet<Person>(url);
  }

  getPeopleNames(): Observable<string[]> {
    return null;
  }

  getPlanets(): Observable<Planet[]> {
    const url = `${this.baseUrl}/planets`;
    return this.getDataSet<Planet>(url);
  }

  getStarships(): Observable<Starship[]> {
    const url = `${this.baseUrl}/starships`;
    return this.getDataSet<Starship>(url);
  }

  getFilms(): Observable<Film[]> {
    const url = `${this.baseUrl}/films`;
    return this.getDataSet<Film>(url);
  }

  getData<T>(url: string): Observable<T> {
    return this.http.get<any>(url);
  }

  private getDataSet<T>(url: string): Observable<T[]> {
    return this.http.get<any>(url).pipe(
      timeout(1000),
      map(result => result.results),
      catchError(err => {
        return of([]);
      })
    );
  }
}
