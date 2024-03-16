// import { IStudentState, IStudent } from '../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchMoviesByType, fetchMoviesList } from './asyncActions'

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
	count1: number
	next: string
	previous: string | null
	results: IMovie[]
}

interface IHomeState {
	movies: IMovieListData | null
	movieList: IMovieListData | null
	isLoading: boolean
	isSuccess: boolean
	isError: boolean
}

const initialState: IHomeState = {
	movies: null,
	movieList: null,
	isLoading: false,
	isSuccess: false,
	isError: false,
}

export const homeSlice = createSlice({
	name: 'home',
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
	},
})

export const { reset } = homeSlice.actions
export default homeSlice.reducer
