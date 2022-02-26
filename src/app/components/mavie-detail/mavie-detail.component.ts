import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieDetailsService } from 'src/app/services/movie-details.service';
import { SharedService } from 'src/app/services/shared.service';
import {MatDialog} from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({

  selector: 'app-mavie-detail',
  templateUrl: './mavie-detail.component.html',
  styleUrls: ['./mavie-detail.component.css']
})
export class MavieDetailComponent implements OnInit {
  sessionID:string = '';
  rating:number = 0 ;
  movie_id:number = 0 ;
  movieReviews:any;
  constructor(private sharedService : SharedService,
    private MovieDetailsService :MovieDetailsService,
    private route :ActivatedRoute,
    public dialog: MatDialog,
   
    ) { }
 movie:any;

  ngOnInit(): void {    
    this.getSessionID();
    this.getMovieReview();
    this.route.params.subscribe(params => {
     this.movie_id = params['id'];
      this.getDetails(params['id']);    
    }); 
  }


getDetails(ID:string){
this.MovieDetailsService.getMovieDetails(ID).subscribe((data:any)=>{
console.log('data',data);
this.movie = data
})
}
getMovieReview(){
 
  this.MovieDetailsService.getMovieReviews(this.movie_id).subscribe((data:any)=>{
    console.log('data',data);
    this.movieReviews = data.results
    })
}
getSessionID(){
  
  this.sharedService.getSessionID().subscribe((data:any)=>{
   this.sessionID = data.guest_session_id
  
  })
}
favoriteMovie(ID:string){

  this.sharedService.favoriteMovie(ID).subscribe((data:any)=>{
   
   })
}




rateMovie(){
console.log('rating',this.rating)

  this.MovieDetailsService.rateMovie(this.movie_id,this.sessionID,this.rating).subscribe((data:any)=>{
    

  })
}
}
