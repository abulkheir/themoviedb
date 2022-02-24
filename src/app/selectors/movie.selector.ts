import { createSelector } from "@ngrx/store";
import { AppState } from "src/app/app.state";
import { Movie } from '../models/movie.model'
export const movieSelector = (state:AppState)=> state.movie;

export const isMovieFavorite =(isFav:boolean)=>
 createSelector(
    movieSelector,
    (movie:Movie[]) => {
        if(!isFav){
            return movie;
        }
        
        return movie.filter(x => x.favorite == isFav)
    }
)
