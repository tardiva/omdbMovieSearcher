import { Component, Input } from '@angular/core';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss']
})
export class MovieItemComponent {
  defaultPoster = '../../assets/img/no-poster.jpg';

  constructor() {  }

  @Input()
  movie: Movie;

}
