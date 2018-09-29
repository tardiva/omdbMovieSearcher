import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MovieService } from '../../services/movie.service';
import { MatAutocompleteTrigger } from '@angular/material';

import {Observable} from 'rxjs';
import { map, startWith, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Movie } from '../../models/movie';

@Component({
  selector: 'app-movie-searcher',
  templateUrl: './movie-searcher.component.html',
  styleUrls: ['./movie-searcher.component.scss']
})
export class MovieSearcherComponent implements OnInit {
  options: Observable<Movie[]>;
  movieItems = [];
  itemsPerPage = 10;
  total: number;

  form = this.fb.group({
    searchControl: ''
  });

  @ViewChild('autocomplete', { read: MatAutocompleteTrigger }) autocomplete: MatAutocompleteTrigger;

  constructor(private fb: FormBuilder,
              private service: MovieService) {
  }

  ngOnInit() {
    /*this.service.searchMovies('Black Cat, White Cat').subscribe(
      (res) => console.log(res)
    );*/
    this.options = this.form.get('searchControl').valueChanges
      .pipe(
        startWith(null),
        debounceTime(200),
        distinctUntilChanged(),
        switchMap(val => {
          return this.filter(val || '');
        })
      );
  }

  filter(val: string): Observable<any[]> {
    return this.service.searchMovies(val)
      .pipe(
        map((res => res.Search))
      );
  }

  onSubmit(): void {
    this.getMoviesPerPage(1);
  }

  onPageChange(event): void {
    this.getMoviesPerPage(event.pageIndex + 1);
  }

  getMoviesPerPage(page) {
    this.service.searchMovies(this.form.value.searchControl, page).subscribe((searchResults) => {
      this.movieItems = searchResults.Search;
      this.movieItems.forEach((movie) => {
        this.service.getMovie(movie.imdbID).subscribe((res) => {
          movie = Object.assign(movie, {Plot: res.Plot});
        });
      })
      this.total = searchResults.totalResults;
      this.autocomplete.closePanel();
    });
  }
}
