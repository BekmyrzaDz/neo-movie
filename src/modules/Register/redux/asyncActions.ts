import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import registerService from '../services/registerService'

interface IUser {
	username: string
	email: string
	password: string
}

interface RegisterResponse {
	id: number
	username: string
	email: string
	password: string
}

// Create User Action
export const createUser = createAsyncThunk<
	RegisterResponse,
	IUser,
	{ rejectValue: string }
>('register/createUser', async (userData, thunkAPI) => {
	try {
		const response = await registerService.createUser(userData)
		return response
	} catch (error: unknown) {
		if (error instanceof AxiosError) {
			return thunkAPI.rejectWithValue(error.message)
		}
		throw error
	}
})
