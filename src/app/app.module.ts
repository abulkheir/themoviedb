import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './components/layout/layout.component';
import { MavieListComponent } from './components/mavie-list/mavie-list.component';
import { HttpClientModule } from '@angular/common/http';
import { MavieDetailComponent } from './components/mavie-detail/mavie-detail.component';
import { StoreModule } from '@ngrx/store';

import { movieReducer } from './reducers/movie.reducer';
import { MovieListService } from './services/movie-list.service';
import { BanenrComponent } from './components/banenr/banenr.component';
import {MatDialogModule} from '@angular/material/dialog';
import { NgxStarRatingModule } from 'ngx-star-rating';
import {MatMenuModule} from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    MavieListComponent,
   
    MavieDetailComponent,
   
    BanenrComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    InfiniteScrollModule,
    NgxStarRatingModule,
    MatDialogModule,
    StoreModule.forRoot({movie:movieReducer})
  ],
  providers: [MovieListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
