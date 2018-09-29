import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { map, mergeMap } from 'rxjs/operators';


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
    return this.http.get<any>(this.url, {params});
      /*.pipe(
        map((res) => {
            res.Search.forEach(val => val.Plot = 'test');
            return res;
          }
        )
      );*/
  }

  getMovie(id): Observable<any> {
    const params = new HttpParams()
      .set('apikey', this.key)
      .set('i', id);
    return this.http.get<any>(this.url, {params});
  }

}

