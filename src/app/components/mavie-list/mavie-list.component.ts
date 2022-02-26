import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieListService } from 'src/app/services/movie-list.service';
import { SharedService } from 'src/app/services/shared.service';
import { Observable } from 'rxjs';
import { Store,select } from '@ngrx/store';
import { Movie } from '../../models/movie.model'
import { AppState } from '../../app.state';
import {addMovie, editMovie} from '../../actions/movie.actions'
import { isMovieFavorite } from 'src/app/selectors/movie.selector';
import { findIndex } from 'rxjs/operators';
@Component({
  selector: 'app-mavie-list',
  templateUrl: './mavie-list.component.html',
  styleUrls: ['./mavie-list.component.css']
})
export class MavieListComponent implements OnInit {
  private currentPage = 1;
  favArr:number[]=[];
movies: Observable<Movie[]> =  this.store.pipe(select(isMovieFavorite(false)));
moviesObj:Movie[] = [];
distance = 2000;
totalPages:number = 0;
selected:boolean = false;
throttle = 0;
scrollDistance = 1;
  constructor(private movieList :MovieListService,
    private router:Router,
    private shredService: SharedService,
    private store: Store<AppState>) {
    
     }
changeToFav(val:boolean){
  this.selected = !this.selected
  this.movies =  this.store.pipe(select(isMovieFavorite(val)));
}

getMovieList(currentPage:number){

  if(currentPage == this.totalPages)
return

  this.movieList.getMovieList(currentPage).subscribe((res:any)=>{ 
    

this.totalPages = res.total_pages
  let arr:Movie[] = []; 
//JSON.stringify(localStorage.getItem('favArr'))
   
console.log("favArr",this.favArr)
   for(let i=0;i <  res.results.length;i++){
      arr.push({
        poster_path: res.results[i].poster_path,
        title: res.results[i].title,
        id:res.results[i].id,
        favorite:false,
        release_date:res.results[i].release_date,
        backdrop_path:res.results[i].backdrop_path,
        popularity:res.results[i].popularity,
        vote_average:res.results[i].vote_average,
       
        overview:res.results[i].overview
      })
    }
    arr.forEach(element => {

      
     this.favArr.includes(element.id)? element.favorite = true : element.favorite = false
    });
    this.moviesObj.length > 0 ? this.moviesObj = this.moviesObj.concat(this.moviesObj) : this.moviesObj .push(...arr);
  },()=>{},()=>{
   this.store.dispatch( addMovie({allMovies:this.moviesObj as Movie[]}))
  })
}
data:any;
favItem(event:any,movie:Movie){
  debugger;
  event.stopPropagation();
  if(!movie.favorite){
    this.favArr.push(movie.id);
    console.log('favArr',this.favArr)
    localStorage.setItem('favArr',this.favArr.join())
  }else{
   // this.favArr.split()
    let index = this.favArr.findIndex(x=> x == movie.id);
    this.favArr.splice(index,1);
    console.log('favArr',this.favArr)
    localStorage.setItem('favArr',this.favArr.join())
  }
 
const movieItemObj:Movie = {
  poster_path: movie.poster_path,
  title: movie.title,
  id:movie.id,
  favorite: !movie.favorite,
  release_date:movie.release_date,
  backdrop_path:movie.backdrop_path,
  popularity:movie.popularity,
  vote_average:movie.vote_average,

  overview:movie.overview
};
   this.store.dispatch(editMovie({movie:movieItemObj }))  
}
  goToDetails(movie:Movie){
    localStorage.setItem('MovieData',JSON.stringify(movie));
    this.shredService.allData.next(movie);
    console.log('movie details obj',movie)
    this.router.navigate(['movie-details',movie.id])
  }
  onScrollDown(ev:any) {  
    if(ev.currentScrollPosition > this.distance){
   
      this.distance += this.distance;
      this.currentPage ++
      this.getMovieList(this.currentPage)
    }

  }
  ngOnInit(): void {
    localStorage.getItem('favArr')? this.favArr = localStorage.getItem("favArr")?.split(",").map(Number)!  :this.favArr  =  []
    this.getMovieList(this.currentPage)
  }

}
