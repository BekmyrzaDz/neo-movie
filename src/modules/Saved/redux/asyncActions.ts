import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import savedService from '../services/savedService'

interface ISaved {
	id: number
	title: string
	image: string
	country_of_origin?: string
	rating?: number
	collection?: {
		name?: string
	}
}

interface ISavedListData {
	page: number
	count1: number
	next: string
	previous: string | null
	results: ISaved[]
}

interface ISavedParams {
	page: number
	limit: number
}

// Fetch Saved Movies by type Action
export const fetchSavedByType = createAsyncThunk<
	ISavedListData,
	ISavedParams,
	{ rejectValue: string }
>('movie/fetchMoviesByType', async (savedParams, thunkAPI) => {
	try {
		const response = await savedService.getSavedByType(savedParams)
		return response
	} catch (error: unknown) {
		if (error instanceof AxiosError) {
			return thunkAPI.rejectWithValue(error.message)
		}
		throw error
	}
})
