import { createReducer,on } from '@ngrx/store'
import { Movie } from './../models/movie.model'
import {addMovie,editMovie} from './../actions/movie.actions'



export const initialState:Movie[] = []

const _movieReducer = createReducer(
    initialState, 
    on(addMovie,(state,{allMovies})=>{
        return [...allMovies]
    }), on(editMovie,(state,action)=>{
        debugger;
      const updatedMovie = state.map((movie)=>{
          return action.movie.id === movie.id? action.movie : movie
      });
      console.log('updatedMovie',updatedMovie);
      console.log('state',state);
      const returnedMovie = {
        ...state,
        movie:updatedMovie
      }
        return returnedMovie.movie
            
            
    })
)

export function movieReducer(state:any,action:any){
    return _movieReducer(state,action)
}

