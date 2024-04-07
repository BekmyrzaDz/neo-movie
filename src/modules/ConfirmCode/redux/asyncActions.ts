import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import confirmCodeService from '../services/confirmCodeService'

interface IConfirm {
	code: string
}

interface ConfirmCodeResponse {
	code: string
}

interface IResendConfirm {
	email: string
}

interface ResendConfirmResponse {
	email: string
}

// Create Confirm Code Action
export const createConfirmCode = createAsyncThunk<
	ConfirmCodeResponse,
	IConfirm,
	{ rejectValue: string }
>('confirmCode/createConfirmCode', async (confirmData, thunkAPI) => {
	try {
		const response = await confirmCodeService.createConfirmCode(confirmData)
		return response
	} catch (error: unknown) {
		if (error instanceof AxiosError) {
			return thunkAPI.rejectWithValue(error.message)
		}
		throw error
	}
})

// Create Resend Confirm Code Action
export const createResendConfirmCode = createAsyncThunk<
	ResendConfirmResponse,
	IResendConfirm,
	{ rejectValue: string }
>('confirmCode/createResendConfirmCode', async (email, thunkAPI) => {
	try {
		const response = await confirmCodeService.createResendConfirmCode(email)
		return response
	} catch (error: unknown) {
		if (error instanceof AxiosError) {
			return thunkAPI.rejectWithValue(error.message)
		}
		throw error
	}
})
