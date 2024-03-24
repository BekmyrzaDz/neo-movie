// import { IStudentState, IStudent } from '../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchMoviesByType } from './asyncActions'

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
	filtered: IMovieListData | null
	isLoading: boolean
	isSuccess: boolean
	isError: boolean
}

const initialState: IHomeState = {
	filtered: null,
	isLoading: false,
	isSuccess: false,
	isError: false,
}

export const filterSlice = createSlice({
	name: 'filter',
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
			.addCase(fetchMoviesByType.pending, state => {
				state.isLoading = true
			})
			.addCase(
				fetchMoviesByType.fulfilled,
				(state, action: PayloadAction<IMovieListData>) => {
					state.isLoading = false
					state.isSuccess = true
					state.filtered = action.payload
				}
			)
			.addCase(fetchMoviesByType.rejected, state => {
				state.isLoading = false
				state.isError = true
			})
	},
})

export const { reset } = filterSlice.actions
export default filterSlice.reducer
