import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import changeProfilePasswordService from '../services/changeProfilePasswordService'

interface IChangeProfilePassword {
	current_password: string
	new_password: string
	password_confirm: string
}

interface ChangeProfilePasswordResponse {
	current_password: string
	new_password: string
	password_confirm: string
}

// Change Profile Password Action
export const changeProfilePassword = createAsyncThunk<
	ChangeProfilePasswordResponse,
	IChangeProfilePassword,
	{ rejectValue: string }
>(
	'changeProfilePassword/changeProfilePassword',
	async (passwordData, thunkAPI) => {
		try {
			const response = await changeProfilePasswordService.changeProfilePassword(
				passwordData
			)

			if (response) {
				toast.success('Пароль успешно изменен!')
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
	}
)
