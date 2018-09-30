import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule,
         MatInputModule,
         MatAutocompleteModule,
         MatListModule,
         MatPaginatorModule,
         MatToolbarModule} from '@angular/material';
import { NotifierModule } from 'angular-notifier';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MovieSearcherComponent } from './components/movie-searcher/movie-searcher.component';
import { MovieItemComponent } from './components/movie-item/movie-item.component';

import { GlobalErrorHandler } from './global-error-handler';

@NgModule({
  declarations: [
    AppComponent,
    MovieSearcherComponent,
    MovieItemComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatPaginatorModule,
    MatToolbarModule,
    NotifierModule.withConfig( {
      theme: 'material',
      behaviour: {
        autoHide: false
      }
    } ),
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
