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
