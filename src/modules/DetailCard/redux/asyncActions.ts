import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
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
