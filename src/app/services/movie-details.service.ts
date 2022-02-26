import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovieDetailsService {

  constructor(private http: HttpClient ) { }


  rateMovie(movie_id:number,s_ID:string,rating:number){
    let headers = {
      "Content-Type" : "application/json;charset=utf-8"
    }
    return this.http.post(`     
    https://api.themoviedb.org/3/movie/${movie_id}/rating?api_key=40a16c88cd9a1f02de6a0e045c5b1f13&guest_session_id=${s_ID}`   
    ,{
      "value": rating
    },
    {
      headers: headers
    } )    
  }
  getMovieReviews(ID:number,currentPage:number){
    return this.http.get(`     
    https://api.themoviedb.org/3/movie/${ID}/reviews?api_key=40a16c88cd9a1f02de6a0e045c5b1f13&language=en-US&page=${currentPage}` 
   
      )        
  }
}
