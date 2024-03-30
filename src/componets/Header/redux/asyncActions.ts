import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import searchService from '../services/searchService'

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

// Fetch Movies by name Action
export const fetchMoviesByName = createAsyncThunk<
	IMovieListData,
	string,
	{ rejectValue: string }
>('search/fetchMoviesByName', async (text, thunkAPI) => {
	try {
		const response = await searchService.getMoviesByName(text)
		return response
	} catch (error: unknown) {
		if (error instanceof AxiosError) {
			return thunkAPI.rejectWithValue(error.message)
		}
		throw error
	}
})
