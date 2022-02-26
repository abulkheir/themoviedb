
import { createAction,props } from '@ngrx/store'
import { Movie } from './../models/movie.model'

export const addMovie = createAction(
    '[MOVIE] Add',props<{allMovies:Movie[]}>()
)

export const editMovie = createAction(
    '[MOVIE] edit',props<{movie:Movie}>()
)

export const getSpacific = createAction(
    '[MOVIE] Spacific',props<{movie:Movie}>()
)

