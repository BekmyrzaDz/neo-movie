import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import collectionService from '../services/collectionService'

interface ICollection {
	id: number
	name: string
	image: string
}

// Fetch Collection List Action
export const fetchCollectionList = createAsyncThunk<
	ICollection[],
	undefined,
	{ rejectValue: string }
>('collection/fetchCollectionList', async (_, thunkAPI) => {
	try {
		const response = await collectionService.getCollectionList()
		return response
	} catch (error: unknown) {
		if (error instanceof AxiosError) {
			return thunkAPI.rejectWithValue(error.message)
		}
		throw error
	}
})
