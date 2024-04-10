import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import changeProfileService from '../services/changeProfileService'

interface IUser {
	username: string
	email: string
}

interface RegisterResponse {
	id: number
	username: string
	email: string
}

// Change User Action
export const changeUser = createAsyncThunk<
	RegisterResponse,
	IUser,
	{ rejectValue: string }
>('changeProfile/changeUser', async (userData, thunkAPI) => {
	try {
		const response = await changeProfileService.changeUser(userData)

		if (response) {
			toast.success('Профиль успешно изменен!')
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

// Fetch User Action
export const fetchUser = createAsyncThunk<
	RegisterResponse,
	undefined,
	{ rejectValue: string }
>('changeProfile/fetchUser', async (_, thunkAPI) => {
	try {
		const response = await changeProfileService.getUser()
		return response
	} catch (error: unknown) {
		if (error instanceof AxiosError) {
			return thunkAPI.rejectWithValue(error.message)
		}
		throw error
	}
})
