import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'
import createPasswordService from '../services/createPasswordService'

interface ICreatePassword {
	new_password: string
	password_confirm: string
}

interface CreatePasswordResponse {
	new_password: string
	password_confirm: string
}

// Create New Password Action
export const createNewPassword = createAsyncThunk<
	CreatePasswordResponse,
	ICreatePassword,
	{ rejectValue: string }
>('createPassword/createNewPassword', async (createPasswordData, thunkAPI) => {
	try {
		const response = await createPasswordService.changePassword(
			createPasswordData
		)
		if (response) {
			toast.success('Пароль успешно изменен!')
		}
		return response
	} catch (error: unknown) {
		if (error instanceof AxiosError) {
			toast.error(error.message)
			return thunkAPI.rejectWithValue(error.message)
		}
		throw error
	}
})
