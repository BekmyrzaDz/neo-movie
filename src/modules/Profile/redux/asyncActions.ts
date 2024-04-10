import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import profileService from '../services/profileService'

interface RegisterResponse {
	id: number
	username: string
	email: string
}

// Fetch User Action
export const fetchUser = createAsyncThunk<
	RegisterResponse,
	undefined,
	{ rejectValue: string }
>('profile/fetchUser', async (_, thunkAPI) => {
	try {
		const response = await profileService.getUser()
		return response
	} catch (error: unknown) {
		if (error instanceof AxiosError) {
			return thunkAPI.rejectWithValue(error.message)
		}
		throw error
	}
})
