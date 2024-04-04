import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
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

		if (response) {
			toast.success('Вы успешно зарегистрированы')
		}

		return response
	} catch (error: unknown) {
		if (error instanceof AxiosError) {
			toast.error(error.message)

			const username = error.response?.data?.error?.username
			const email = error.response?.data?.error?.email
			const password = error.response?.data?.error?.password

			username && toast.error(username[0])
			email && toast.error(email[0])
			password && toast.error(password[0])

			return thunkAPI.rejectWithValue(error.message)
		}
		throw error
	}
})
