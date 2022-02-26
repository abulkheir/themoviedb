import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http: HttpClient) { }

  allData = new BehaviorSubject({});

  favoriteMovie(session_id:string){
    let headers = {
      "Content-Type" : "application/json;charset=utf-8"
    }
    return this.http.post(`
    

    https://api.themoviedb.org/3/account/621552c3d3d387001c8d03a7/favorite?api_key=40a16c88cd9a1f02de6a0e045c5b1f13&session_id=${session_id}`,
    {
      "media_type": "movie",
      "media_id": 730154,
      "favorite": true
    },
    {
      headers: headers
    })
    .pipe(map((data)=> data || []))
  }
  getSessionID(){
    return this.http.get(`   

    
    https://api.themoviedb.org/3/authentication/guest_session/new?api_key=40a16c88cd9a1f02de6a0e045c5b1f13`   
      )
        .pipe(map((data)=> data || []))
  }

 
}
