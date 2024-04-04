import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import forgotPasswordService from '../services/forgotPasswordService'

interface IUser {
	email: string
}

interface ForgotPasswordResponse {
	email: string
}

// Create Forgot Password Action
export const createForgotPassword = createAsyncThunk<
	ForgotPasswordResponse,
	IUser,
	{ rejectValue: string }
>('forgotPassword/createForgotPassword', async (userData, thunkAPI) => {
	try {
		const response = await forgotPasswordService.createForgotPassword(userData)
		return response
	} catch (error: unknown) {
		if (error instanceof AxiosError) {
			return thunkAPI.rejectWithValue(error.message)
		}
		throw error
	}
})
