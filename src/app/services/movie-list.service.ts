import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class MovieListService {

  constructor(private http: HttpClient) { }

  getMovieList(){
    return this.http.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=40a16c88cd9a1f02de6a0e045c5b1f13&language=en-US&page=1`)
    .pipe(map((data)=> data || []))
  }
}
