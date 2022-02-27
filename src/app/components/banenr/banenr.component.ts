import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieDetailsService } from 'src/app/services/movie-details.service';
import { SharedService } from 'src/app/services/shared.service';


export interface SearchModel {
  results: [];
}


@Component({
  selector: 'app-banenr',
  templateUrl: './banenr.component.html',
  styleUrls: ['./banenr.component.css']
})

export class BanenrComponent implements OnInit {
 
  constructor(private MovieDetailsService : MovieDetailsService,
    private sharedService : SharedService,
    private router : Router) {
   
   }
   keyword = 'title';
   data:SearchModel[] = [];
 
 
   selectEvent(item:any) {
   
     this.sharedService.allData.next(item);
     this.router.navigate(['movie-details',item.id])
   }
 
   onChangeSearch(val: string) {
    if(val.length < 3)
    return

    this.MovieDetailsService.search(val).subscribe((res:any)=>{  
      this.data = res.results;
 
    })
   }
  ngOnInit() { 
   
  }
}
