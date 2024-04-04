import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createForgotPassword } from './asyncActions'

interface ForgotPasswordResponse {
	email: string
}

interface ForgotPasswordState {
	email: ForgotPasswordResponse | null
	isLoading: boolean
	isSuccess: boolean
	isError: boolean
}

const initialState: ForgotPasswordState = {
	email: null,
	isLoading: false,
	isSuccess: false,
	isError: false,
}

export const forgotPasswordSlice = createSlice({
	name: 'forgotPassword',
	initialState,
	reducers: {
		reset: state => {
			state.isLoading = false
			state.isSuccess = false
			state.isError = false
		},
	},
	extraReducers: builder => {
		builder
			.addCase(createForgotPassword.pending, state => {
				state.isLoading = true
			})
			.addCase(
				createForgotPassword.fulfilled,
				(state, action: PayloadAction<ForgotPasswordResponse>) => {
					state.isLoading = false
					state.isSuccess = true
					state.email = action.payload
				}
			)
			.addCase(createForgotPassword.rejected, state => {
				state.isLoading = false
				state.isError = true
			})
	},
})

export const { reset } = forgotPasswordSlice.actions
export default forgotPasswordSlice.reducer
