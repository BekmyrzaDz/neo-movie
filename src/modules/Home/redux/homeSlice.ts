// import { IStudentState, IStudent } from '../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
	fetchAnimeByType,
	fetchCartoonsByType,
	fetchCollectionList,
	fetchMoviesByType,
	fetchMoviesList,
	fetchSerialsByType,
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

interface ICollection {
	id: number
	name: string
	image: string
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
	serials: IMovieListData | null
	cartoons: IMovieListData | null
	anime: IMovieListData | null
	movieList: IMovieListData | null
	collectionList: ICollection[]
	isLoading: boolean
	isSuccess: boolean
	isError: boolean
}

const initialState: IHomeState = {
	movies: null,
	serials: null,
	cartoons: null,
	anime: null,
	movieList: null,
	collectionList: [],
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
			.addCase(fetchCollectionList.pending, state => {
				state.isLoading = true
			})
			.addCase(
				fetchCollectionList.fulfilled,
				(state, action: PayloadAction<ICollection[]>) => {
					state.isLoading = false
					state.isSuccess = true
					state.collectionList = action.payload
				}
			)
			.addCase(fetchCollectionList.rejected, state => {
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
			.addCase(fetchSerialsByType.pending, state => {
				state.isLoading = true
			})
			.addCase(
				fetchSerialsByType.fulfilled,
				(state, action: PayloadAction<IMovieListData>) => {
					state.isLoading = false
					state.isSuccess = true
					state.serials = action.payload
				}
			)
			.addCase(fetchSerialsByType.rejected, state => {
				state.isLoading = false
				state.isError = true
			})
			.addCase(fetchCartoonsByType.pending, state => {
				state.isLoading = true
			})
			.addCase(
				fetchCartoonsByType.fulfilled,
				(state, action: PayloadAction<IMovieListData>) => {
					state.isLoading = false
					state.isSuccess = true
					state.cartoons = action.payload
				}
			)
			.addCase(fetchCartoonsByType.rejected, state => {
				state.isLoading = false
				state.isError = true
			})
			.addCase(fetchAnimeByType.pending, state => {
				state.isLoading = true
			})
			.addCase(
				fetchAnimeByType.fulfilled,
				(state, action: PayloadAction<IMovieListData>) => {
					state.isLoading = false
					state.isSuccess = true
					state.anime = action.payload
				}
			)
			.addCase(fetchAnimeByType.rejected, state => {
				state.isLoading = false
				state.isError = true
			})
	},
})

export const { reset } = homeSlice.actions
export default homeSlice.reducer
