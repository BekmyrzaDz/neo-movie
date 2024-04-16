import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import animeService from '../services/animeService'

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

interface IMovieParams {
	type: string
	limit: number
	page?: number
}

// Fetch Movies by type did mount Action
export const fetchMoviesByTypeDidMount = createAsyncThunk<
	IMovieListData,
	IMovieParams,
	{ rejectValue: string }
>('movie/fetchMoviesDidMountByType', async (movieParams, thunkAPI) => {
	try {
		const response = await animeService.getMoviesByTypeDidMount(movieParams)
		return response
	} catch (error: unknown) {
		if (error instanceof AxiosError) {
			return thunkAPI.rejectWithValue(error.message)
		}
		throw error
	}
})

// Fetch Movies by type Action
export const fetchMoviesByType = createAsyncThunk<
	IMovieListData,
	IMovieParams,
	{ rejectValue: string }
>('anime/fetchMoviesByType', async (movieParams, thunkAPI) => {
	try {
		const response = await animeService.getMoviesByType(movieParams)
		return response
	} catch (error: unknown) {
		if (error instanceof AxiosError) {
			return thunkAPI.rejectWithValue(error.message)
		}
		throw error
	}
})
