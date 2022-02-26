import { createReducer,on } from '@ngrx/store'
import { Movie } from './../models/movie.model'
import {addMovie,editMovie, getSpacific} from './../actions/movie.actions'



export const initialState:Movie[] = []

const _movieReducer = createReducer(
    initialState, 
    on(addMovie,(state,{allMovies})=>{
        return [...allMovies]
    }), on(editMovie,(state,action)=>{   
      const updatedMovie = state.map((movie)=>{
          return action.movie.id === movie.id? action.movie : movie
      });
   
      const returnedMovie = {
        ...state,
        movie:updatedMovie
      }
        return returnedMovie.movie
            
            
    },   ),
    on(getSpacific,(state,action)=>{   
        const SpacificMovie = state.map((movie)=>{
            return action.movie.id === movie.id? action.movie : movie
        });
     
        const returnedSpacificMovie = {
          ...state,
          movie:SpacificMovie
        }
          return returnedSpacificMovie.movie
              
              
      })
)

export function movieReducer(state:any,action:any){
    return _movieReducer(state,action)
}

