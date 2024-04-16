import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
	fetchMoviesByType,
	fetchMoviesByTypeDidMount,
	fetchMoviesList,
} from './asyncActions'

interface IMovie {
	id: number
	title: string
	image: string
	country_of_origin?: string
	rating?: number
	collection?: {
		name?: string
	}
}

interface IMovieListData {
	page: number
	count: number
	next: string
	previous: string | null
	results: IMovie[]
}

interface IMovieState {
	movies: IMovieListData | null
	movieList: IMovieListData | null
	isLoading: boolean
	isSuccess: boolean
	isError: boolean
}

const initialState: IMovieState = {
	movies: null,
	movieList: null,
	isLoading: false,
	isSuccess: false,
	isError: false,
}

export const movieSlice = createSlice({
	name: 'movie',
	initialState,
	reducers: {
		reset: state => {
			state.isLoading = false
			state.isSuccess = false
			state.isError = false
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchMoviesList.pending, state => {
				state.isLoading = true
			})
			.addCase(
				fetchMoviesList.fulfilled,
				(state, action: PayloadAction<IMovieListData>) => {
					state.isLoading = false
					state.isSuccess = true
					state.movieList = action.payload
				}
			)
			.addCase(fetchMoviesList.rejected, state => {
				state.isLoading = false
				state.isError = true
			})
			.addCase(fetchMoviesByType.pending, state => {
				state.isLoading = true
			})
			.addCase(
				fetchMoviesByType.fulfilled,
				(state, action: PayloadAction<IMovieListData>) => {
					state.isLoading = false
					state.isSuccess = true
					state.movies = action.payload
				}
			)
			.addCase(fetchMoviesByType.rejected, state => {
				state.isLoading = false
				state.isError = true
			})
			.addCase(fetchMoviesByTypeDidMount.pending, state => {
				state.isLoading = true
			})
			.addCase(
				fetchMoviesByTypeDidMount.fulfilled,
				(state, action: PayloadAction<IMovieListData>) => {
					state.isLoading = false
					state.isSuccess = true
					state.movies = action.payload
				}
			)
			.addCase(fetchMoviesByTypeDidMount.rejected, state => {
				state.isLoading = false
				state.isError = true
			})
	},
})

export const { reset } = movieSlice.actions
export default movieSlice.reducer
