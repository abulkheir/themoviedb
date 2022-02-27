import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MovieListService {

  constructor(private http: HttpClient) { }

  getMovieList(page:number){
    return this.http.get(`${environment.apiUrl}/movie/top_rated?api_key=${environment.apiKey}&language=en-US&page=${page}`)
    .pipe(map((data)=> data || []))
  }

}
