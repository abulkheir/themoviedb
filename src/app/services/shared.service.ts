import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

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
    

    ${environment.apiUrl}/account/621552c3d3d387001c8d03a7/favorite?api_key=${environment.apiKey}&session_id=${session_id}`,
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

    
    ${environment.apiUrl}/authentication/guest_session/new?api_key=${environment.apiKey}`   
      )
        .pipe(map((data)=> data || []))
  }

 
}
