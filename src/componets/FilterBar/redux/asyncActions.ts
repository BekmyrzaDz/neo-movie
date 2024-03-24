import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import filterService from '../services/filterBarService'

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

interface IMoviesByTypeParams {
	category: string
	genre: string[]
	country: string[]
	year: string
}

// Fetch Movies by type Action
export const fetchMoviesByType = createAsyncThunk<
	IMovieListData,
	IMoviesByTypeParams,
	{ rejectValue: string }
>('filter/fetchMoviesByType', async (movieParams, thunkAPI) => {
	try {
		const response = await filterService.getMoviesByType(movieParams)
		return response
	} catch (error: unknown) {
		if (error instanceof AxiosError) {
			return thunkAPI.rejectWithValue(error.message)
		}
		throw error
	}
})
