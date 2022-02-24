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
@Component({
  selector: 'app-mavie-list',
  templateUrl: './mavie-list.component.html',
  styleUrls: ['./mavie-list.component.css']
})
export class MavieListComponent implements OnInit {

movies: Observable<Movie[]> =  this.store.pipe(select(isMovieFavorite(false)));
moviesObj:Movie[] = [];
  constructor(private movieList :MovieListService,
    private router:Router,
    private shredService: SharedService,
    private store: Store<AppState>) {
    
     }
changeToFav(val:boolean){
  this.movies =  this.store.pipe(select(isMovieFavorite(val)));
}

getMovieList(){
  this.movieList.getMovieList().subscribe((res:any)=>{ 
    for(let i=0;i < res.results.length;i++){
      this.moviesObj.push({
        poster_path: res.results[i].poster_path,
        title: res.results[i].title,
        id:res.results[i].id,
        favorite:false
      })
    }
  
    console.log('movieList',this.movies);
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
debugger;
   this.store.dispatch(editMovie({movie:moviexx }))

 
  
}
  goToDetails(id:number){
    this.router.navigate(['movie-details',id])
  }

  ngOnInit(): void {
    this.getMovieList()
  }

}
