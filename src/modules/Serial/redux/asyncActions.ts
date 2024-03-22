import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import movieService from '../services/serialService'

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

interface IMovieParams {
	type: string
	limit: number
}

// Fetch Movies by type Action
export const fetchMoviesByType = createAsyncThunk<
	IMovieListData,
	IMovieParams,
	{ rejectValue: string }
>('serial/fetchMoviesByType', async (movieParams, thunkAPI) => {
	try {
		const response = await movieService.getMoviesByType(movieParams)
		return response
	} catch (error: unknown) {
		if (error instanceof AxiosError) {
			return thunkAPI.rejectWithValue(error.message)
		}
		throw error
	}
})
