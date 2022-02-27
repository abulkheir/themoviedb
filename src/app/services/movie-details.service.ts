import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

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
    ${environment.apiUrl}/movie/${movie_id}/rating?api_key=${environment.apiKey}&guest_session_id=${s_ID}`   
    ,{
      "value": rating
    },
    {
      headers: headers
    } )    
  }
  getMovieReviews(ID:number,currentPage:number){
    return this.http.get(`     
    ${environment.apiUrl}/movie/${ID}/reviews?api_key=${environment.apiKey}&language=en-US&page=${currentPage}` 
   
      )        
  }
  search(val:string){
    return this.http.get(`     
    ${environment.apiUrl}/search/movie?api_key=${environment.apiKey}&query=${val}` 
   
      )
  }
}

