import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import homeService from '../services/homeService'

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

interface ICollection {
	id: number
	name: string
	image: string
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
>('home/fetchMoviesByType', async (movieParams, thunkAPI) => {
	try {
		const response = await homeService.getMoviesByType(movieParams)
		return response
	} catch (error: unknown) {
		if (error instanceof AxiosError) {
			return thunkAPI.rejectWithValue(error.message)
		}
		throw error
	}
})

// Fetch Movies by type Action
export const fetchSerialsByType = createAsyncThunk<
	IMovieListData,
	IMovieParams,
	{ rejectValue: string }
>('home/fetchSerialsByType', async (movieParams, thunkAPI) => {
	try {
		const response = await homeService.getMoviesByType(movieParams)
		return response
	} catch (error: unknown) {
		if (error instanceof AxiosError) {
			return thunkAPI.rejectWithValue(error.message)
		}
		throw error
	}
})

// Fetch Movies by type Action
export const fetchCartoonsByType = createAsyncThunk<
	IMovieListData,
	IMovieParams,
	{ rejectValue: string }
>('home/fetchCartoonsByType', async (movieParams, thunkAPI) => {
	try {
		const response = await homeService.getMoviesByType(movieParams)
		return response
	} catch (error: unknown) {
		if (error instanceof AxiosError) {
			return thunkAPI.rejectWithValue(error.message)
		}
		throw error
	}
})

// Fetch Movies by type Action
export const fetchAnimeByType = createAsyncThunk<
	IMovieListData,
	IMovieParams,
	{ rejectValue: string }
>('home/fetchAnimeByType', async (movieParams, thunkAPI) => {
	try {
		const response = await homeService.getMoviesByType(movieParams)
		return response
	} catch (error: unknown) {
		if (error instanceof AxiosError) {
			return thunkAPI.rejectWithValue(error.message)
		}
		throw error
	}
})

// Fetch Movies List Action
export const fetchMoviesList = createAsyncThunk<
	IMovieListData,
	undefined,
	{ rejectValue: string }
>('home/fetchMovieList', async (_, thunkAPI) => {
	try {
		const response = await homeService.getMoviesList()
		return response
	} catch (error: unknown) {
		if (error instanceof AxiosError) {
			return thunkAPI.rejectWithValue(error.message)
		}
		throw error
	}
})
// Fetch Collection List Action
export const fetchCollectionList = createAsyncThunk<
	ICollection[],
	undefined,
	{ rejectValue: string }
>('home/fetchCollectionList', async (_, thunkAPI) => {
	try {
		const response = await homeService.getCollectionList()
		return response
	} catch (error: unknown) {
		if (error instanceof AxiosError) {
			return thunkAPI.rejectWithValue(error.message)
		}
		throw error
	}
})
