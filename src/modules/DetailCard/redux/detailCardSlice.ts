import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
	createFavoriteById,
	createReview,
	deleteFavoriteById,
	deleteReviewById,
	fetchMovieById,
} from './asyncActions'

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
	reviews: Reviews[]
	collection: Genre
	is_favorite: boolean
	budget_amount?: string
}

interface Detailimage {
	image: string
}

interface Genre {
	name: string
}

interface Reviews {
	id: number
	movie: number
	user: User
	text: string
	parent_review: number
	created_at: string
}

interface User {
	id: number
	username: string
}

interface ReviewResponse {
	movie: number
	user: User
	text: string
	parent_review?: number
}

interface IMovieState {
	movie: IMovie | null
	review: ReviewResponse | null
	isLoading: boolean
	isSuccess: boolean
	isError: boolean
}

const initialState: IMovieState = {
	movie: null,
	review: null,
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
			.addCase(deleteFavoriteById.pending, state => {
				state.isLoading = true
			})
			.addCase(deleteFavoriteById.fulfilled, state => {
				state.isLoading = false
				state.isSuccess = true
			})
			.addCase(deleteFavoriteById.rejected, state => {
				state.isLoading = false
				state.isError = true
			})
			.addCase(createFavoriteById.pending, state => {
				state.isLoading = true
			})
			.addCase(createFavoriteById.fulfilled, state => {
				state.isLoading = false
				state.isSuccess = true
			})
			.addCase(createFavoriteById.rejected, state => {
				state.isLoading = false
				state.isError = true
			})
			.addCase(createReview.pending, state => {
				state.isLoading = true
			})
			.addCase(
				createReview.fulfilled,
				(state, action: PayloadAction<ReviewResponse>) => {
					state.isLoading = false
					state.isSuccess = true
					state.review = action.payload
				}
			)
			.addCase(createReview.rejected, state => {
				state.isLoading = false
				state.isError = true
			})
			.addCase(deleteReviewById.pending, state => {
				state.isLoading = true
			})
			.addCase(deleteReviewById.fulfilled, state => {
				state.isLoading = false
				state.isSuccess = true
			})
			.addCase(deleteReviewById.rejected, state => {
				state.isLoading = false
				state.isError = true
			})
	},
})

export const { reset } = detailSlice.actions
export default detailSlice.reducer
