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
import { share, finalize } from 'rxjs/operators';
@Component({
  selector: 'app-mavie-list',
  templateUrl: './mavie-list.component.html',
  styleUrls: ['./mavie-list.component.css']
})
export class MavieListComponent implements OnInit {
  private currentPage = 1;
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
    for(let i=0;i <  res.results.length;i++){
      arr.push({
        poster_path: res.results[i].poster_path,
        title: res.results[i].title,
        id:res.results[i].id,
        favorite:false
      })
    }

  
    this.moviesObj.length > 0 ? this.moviesObj = this.moviesObj.concat(this.moviesObj) : this.moviesObj .push(...arr) 


  },()=>{},()=>{
   this.store.dispatch( addMovie({allMovies:this.moviesObj as Movie[]}))
  })
}
data:any;
favItem(event:any,movie:Movie,favVal:boolean){
  event.stopPropagation();

  
const moviexx:Movie = {
  poster_path: movie.poster_path,
  title: movie.title,
  id:movie.id,
  favorite: !favVal
};
   this.store.dispatch(editMovie({movie:moviexx }))  
}
  goToDetails(movie:Movie){
    this.shredService.allData.emit(movie)
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
    this.getMovieList(this.currentPage)
  }

}
