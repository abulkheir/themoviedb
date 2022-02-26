import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieDetailsService } from 'src/app/services/movie-details.service';
import { SharedService } from 'src/app/services/shared.service';
import {MatDialog} from '@angular/material/dialog';
import { MovieReviews } from 'src/app/models/movieReviews.model';

@Component({

  selector: 'app-mavie-detail',
  templateUrl: './mavie-detail.component.html',
  styleUrls: ['./mavie-detail.component.css']
})
export class MavieDetailComponent implements OnInit {
  sessionID:string = '';
  rating:number = 0 ;
  movie_id:number = 0 ;
  scrollDistance = 1;
  distance = 2000;
  throttle = 0;
  totalPages:number = 0;
  private currentPage = 1;
  movieReviews:MovieReviews[]=[];
  constructor(private sharedService : SharedService,
    private MovieDetailsService :MovieDetailsService,
    private route :ActivatedRoute,
    public dialog: MatDialog,
   
    ) { }
 movie:any;

  ngOnInit(): void {    
    this.getSessionID();
   
    this.route.params.subscribe(params => {
     this.movie_id = params['id'];
      this.getDetails(params['id']);    
    }); 
    this.getMovieReview(this.currentPage);
  }


getDetails(ID:string){
this.MovieDetailsService.getMovieDetails(ID).subscribe((data:any)=>{
console.log('data',data);
this.movie = data
})
}
getMovieReview(currentPage:number){
  if(currentPage == this.totalPages)
  return

  this.MovieDetailsService.getMovieReviews(this.movie_id,currentPage).subscribe((data:any)=>{
    console.log('data',data);
    let arr = [];
    arr = data.results;
    this.totalPages = data.total_pages; 
    this.movieReviews.length > 0 ? this.movieReviews = this.movieReviews.concat(this.movieReviews) : this.movieReviews .push(...arr) 
    })
}
getSessionID(){
  
  this.sharedService.getSessionID().subscribe((data:any)=>{
   this.sessionID = data.guest_session_id
  
  })
}
onScrollDown(ev:any) {
  if(ev.currentScrollPosition > this.distance){
 
    this.distance += this.distance;
    this.currentPage ++
    this.getMovieReview(this.currentPage)
  }

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
