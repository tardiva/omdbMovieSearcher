import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Movie } from '../models/movie';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class MovieService {
  url = 'http://www.omdbapi.com/';
  key = '6e3df609';

  constructor(private http: HttpClient) {
  }

  searchMovies(searchString, page = '1'): Observable<any> {
    const params = new HttpParams()
      .set('apikey', this.key)
      .set('s', searchString)
      .set('page', page);
    return this.http.get<any>(this.url, {params})
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      );
  }

  getMovie(id): Observable<Movie> {
    const params = new HttpParams()
      .set('apikey', this.key)
      .set('i', id);
    return this.http.get<Movie>(this.url, {params})
      .pipe(
        catchError((error: any) => {
          return throwError(error);
        })
      );
  }

}

