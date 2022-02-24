import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import { LayoutComponent } from './components/layout/layout.component';
import { MavieListComponent } from './components/mavie-list/mavie-list.component';
import { HttpClientModule } from '@angular/common/http';
import { MavieDetailComponent } from './components/mavie-detail/mavie-detail.component';
import { StoreModule } from '@ngrx/store';

import { movieReducer } from './reducers/movie.reducer';
import { MovieListService } from './services/movie-list.service';
@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    MavieListComponent,
    MavieDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    StoreModule.forRoot({movie:movieReducer})
  ],
  providers: [MovieListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
