import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchMoviesByName } from './asyncActions'

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

interface IMovieState {
	searchMovies: IMovieListData | null
	isLoading: boolean
	isSuccess: boolean
	isError: boolean
}

const initialState: IMovieState = {
	searchMovies: null,
	isLoading: false,
	isSuccess: false,
	isError: false,
}

export const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		reset: state => {
			state.isLoading = false
			state.isSuccess = false
			state.isError = false
			state.searchMovies = null
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchMoviesByName.pending, state => {
				state.isLoading = true
			})
			.addCase(
				fetchMoviesByName.fulfilled,
				(state, action: PayloadAction<IMovieListData>) => {
					state.isLoading = false
					state.isSuccess = true
					state.searchMovies = action.payload
				}
			)
			.addCase(fetchMoviesByName.rejected, state => {
				state.isLoading = false
				state.isError = true
			})
	},
})

export const { reset } = searchSlice.actions
export default searchSlice.reducer
