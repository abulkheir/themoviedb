import { Component, OnInit } from '@angular/core';
import { MovieListService } from 'src/app/services/movie-list.service';

@Component({
  selector: 'app-mavie-list',
  templateUrl: './mavie-list.component.html',
  styleUrls: ['./mavie-list.component.css']
})
export class MavieListComponent implements OnInit {

movies:[] = [];

  constructor(private movieList :MovieListService) { }


  getMovieList(){
    this.movieList.getMovieList().subscribe((res:any)=>{
     
      this.movies = res.results;
      console.log('movieList',this.movies);
    })
  }


  ngOnInit(): void {
    this.getMovieList()
  }

}
