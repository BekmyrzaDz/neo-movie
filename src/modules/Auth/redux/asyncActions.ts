import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import authService from '../services/authService'

interface IUser {
	username: string
	password: string
}

interface LoginResponse {
	access: string
	refresh: string
}

// Create Auth User Action
export const createAuthUser = createAsyncThunk<
	LoginResponse,
	IUser,
	{ rejectValue: string }
>('auth/createAuthUser', async (userData, thunkAPI) => {
	try {
		const response = await authService.createLoginUser(userData)

		if (response) {
			localStorage.setItem('access_token', response.access)
			localStorage.setItem('refresh_token', response.refresh)
			toast.success('Вы успешно вошли в систему')
		}

		return response
	} catch (error: unknown) {
		if (error instanceof AxiosError) {
			toast.error(error.message)

			const message = error.response?.data?.error
			message && toast.error(message)

			return thunkAPI.rejectWithValue(error.message)
		}
		throw error
	}
})
