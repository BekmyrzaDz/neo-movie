import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError, AxiosResponse } from 'axios'
import detailCardService from '../services/detailCardService'

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
	user: number
	text: string
	parent_review: number
	created_at: string
}

interface IMovieParam {
	id: number
}

// Fetch Movie by id Action
export const fetchMovieById = createAsyncThunk<
	IMovie,
	IMovieParam,
	{ rejectValue: string }
>('detail/fetchMovieById', async (movieParams, thunkAPI) => {
	try {
		const response = await detailCardService.getMovieById(movieParams)
		return response
	} catch (error: unknown) {
		if (error instanceof AxiosError) {
			return thunkAPI.rejectWithValue(error.message)
		}
		throw error
	}
})

// Create Favorite Action
export const createFavoriteById = createAsyncThunk<
	AxiosResponse,
	IMovieParam,
	{ rejectValue: string }
>('detail/createFavoriteById', async (movieParams, thunkAPI) => {
	try {
		const response = await detailCardService.createFavoriteById(movieParams)
		return response
	} catch (error: unknown) {
		if (error instanceof AxiosError) {
			return thunkAPI.rejectWithValue(error.message)
		}
		throw error
	}
})

// Delete Favorite Action
export const deleteFavoriteById = createAsyncThunk<
	AxiosResponse,
	IMovieParam,
	{ rejectValue: string }
>('detail/deleteFavoriteById', async (movieParams, thunkAPI) => {
	try {
		const response = await detailCardService.deleteFavoriteById(movieParams)
		return response
	} catch (error: unknown) {
		if (error instanceof AxiosError) {
			return thunkAPI.rejectWithValue(error.message)
		}
		throw error
	}
})
