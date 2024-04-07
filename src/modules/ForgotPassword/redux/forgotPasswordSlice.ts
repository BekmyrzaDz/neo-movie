import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createForgotPassword } from './asyncActions'

interface ForgotPasswordResponse {
	email: string
}

interface ForgotPasswordState {
	email: ForgotPasswordResponse | null
	saveEmail: string
	isLoading: boolean
	isSuccess: boolean
	isError: boolean
}

const initialState: ForgotPasswordState = {
	email: null,
	saveEmail: '',
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
		resetFull: state => {
			state.isLoading = false
			state.isSuccess = false
			state.isError = false
			state.email = null
		},
		resetWithoutIsLoading: state => {
			state.isSuccess = false
			state.isError = false
			state.email = null
		},
		setEmail: (state, action) => {
			state.saveEmail = action.payload
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
				state.isSuccess = false
				state.isError = true
			})
	},
})

export const { reset, resetFull, resetWithoutIsLoading, setEmail } =
	forgotPasswordSlice.actions
export default forgotPasswordSlice.reducer
