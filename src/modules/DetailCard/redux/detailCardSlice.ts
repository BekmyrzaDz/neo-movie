import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchMovieById } from './asyncActions'

interface IMovie {
	id: number
	title: string
	description: string
	image: string
	country_of_origin: string
	age_limit: number
	rating: number
	film_duration: string
	release_year: number
	genres: Genre[]
	detail_images: Detailimage[]
	reviews: any[]
	collection: Genre
	is_favorite: boolean
}

interface Detailimage {
	image: string
}

interface Genre {
	name: string
}

interface IMovieState {
	movie: IMovie | null
	isLoading: boolean
	isSuccess: boolean
	isError: boolean
}

const initialState: IMovieState = {
	movie: null,
	isLoading: false,
	isSuccess: false,
	isError: false,
}

export const detailSlice = createSlice({
	name: 'detail',
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
			.addCase(fetchMovieById.pending, state => {
				state.isLoading = true
			})
			.addCase(
				fetchMovieById.fulfilled,
				(state, action: PayloadAction<IMovie>) => {
					state.isLoading = false
					state.isSuccess = true
					state.movie = action.payload
				}
			)
			.addCase(fetchMovieById.rejected, state => {
				state.isLoading = false
				state.isError = true
			})
	},
})

export const { reset } = detailSlice.actions
export default detailSlice.reducer
