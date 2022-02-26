import { Component, OnInit} from '@angular/core';
import {  Router } from '@angular/router';
import { MovieDetailsService } from 'src/app/services/movie-details.service';
import { SharedService } from 'src/app/services/shared.service';
import {MatDialog} from '@angular/material/dialog';
import { MovieReviews } from 'src/app/models/movieReviews.model';
import { Movie } from 'src/app/models/movie.model';



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
  favArr:number[]=[];
  favorite:boolean = false;
  totalPages:number = 0;
  private currentPage = 1;
  movie:any;
  movieReviews:MovieReviews[]=[];
  constructor(private sharedService : SharedService,
    private MovieDetailsService :MovieDetailsService,
    private router :Router,
    public dialog: MatDialog,   
    
    ) {
      window.onpopstate = function (e) {
        alert('back button is disaples for this page please use the provided back arrow');  
        window.history.forward();
       }
     }


  ngOnInit(): void {    
    this.getSessionID();
    localStorage.getItem('favArr')? this.favArr.push(JSON.parse(JSON.stringify(localStorage.getItem('favArr'))))  :this.favArr  =  []
  
    this.sharedService.allData.subscribe((data)=> {

      let MovieData:any = localStorage.getItem('MovieData')
     Object.keys(data).length != 0? this.movie = data :this.movie = JSON.parse(MovieData);
     
      this.movie_id = this.movie.id
     this.favArr.includes(this.movie_id)? this.favorite = true: this.favorite = false
    }) 
    this.getMovieReview(this.currentPage);
  }



getMovieReview(currentPage:number){
  if(currentPage == this.totalPages)
  return

  this.MovieDetailsService.getMovieReviews(this.movie_id,currentPage).subscribe((data:any)=>{
  
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
goback(){
  this.router.navigate(['all-movies'])
}
onScrollDown(ev:any) {
  if(ev.currentScrollPosition > this.distance){
 
    this.distance += this.distance;
    this.currentPage ++
    this.getMovieReview(this.currentPage)
  }

}
favoriteMovie(fav:boolean,ID:number){
  if(!fav){
    this.favArr.push(ID);
    localStorage.setItem('favArr',this.favArr+"");
   this.favorite = true
  }else{
    let index =   this.favArr.findIndex(x=> x == ID);
    this.favArr.splice(index,1);
    localStorage.setItem('favArr',this.favArr+"");
   this.favorite = false
  }
}




rateMovie(){


  this.MovieDetailsService.rateMovie(this.movie_id,this.sessionID,this.rating).subscribe((data:any)=>{
    

  })
}
}
