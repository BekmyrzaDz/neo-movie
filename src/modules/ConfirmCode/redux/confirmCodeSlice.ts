import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createConfirmCode, createResendConfirmCode } from './asyncActions'

interface ConfirmCodeResponse {
	code: string
}

interface ResendConfirmCodeResponse {
	email: string
}

interface ConfirmCodeState {
	code: ConfirmCodeResponse | null
	email: ResendConfirmCodeResponse | null
	isLoading: boolean
	isSuccess: boolean
	isError: boolean
	isCountdown: boolean
	showCountdown: boolean
	isDone: boolean
	isInvalidCode: boolean
	resendCode: boolean
}

const initialState: ConfirmCodeState = {
	code: null,
	email: null,
	isLoading: false,
	isSuccess: false,
	isError: false,
	isCountdown: false,
	showCountdown: false,
	isDone: false,
	isInvalidCode: false,
	resendCode: false,
}

export const confirmCodeSlice = createSlice({
	name: 'confirmCode',
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
			state.code = null
		},
		resetWithoutIsLoading: state => {
			state.isSuccess = false
			state.isError = false
			state.code = null
		},
		setShowCountdown: state => {
			state.showCountdown = true
		},
		resetShowCountdown: state => {
			state.showCountdown = false
		},
		setIsCountdown: state => {
			state.isCountdown = true
		},
		resetIsCountdown: state => {
			state.isCountdown = false
		},
		setIsDone: state => {
			state.isDone = true
		},
		resetIsDone: state => {
			state.isDone = false
		},
		setResendCode: state => {
			state.resendCode = true
		},
		resetResendCode: state => {
			state.resendCode = false
		},
		setIsInvalidCode: state => {
			state.isInvalidCode = true
		},
		resetIsInvalidCode: state => {
			state.isInvalidCode = false
		},
	},
	extraReducers: builder => {
		builder
			.addCase(createConfirmCode.pending, state => {
				state.isLoading = true
			})
			.addCase(
				createConfirmCode.fulfilled,
				(state, action: PayloadAction<ConfirmCodeResponse>) => {
					state.isLoading = false
					state.isSuccess = true
					state.isInvalidCode = false
					state.code = action.payload
				}
			)
			.addCase(createConfirmCode.rejected, state => {
				state.isLoading = false
				state.isSuccess = false
				state.isError = true
				// state.isInvalidCode = true
			})
			.addCase(createResendConfirmCode.pending, state => {
				state.isLoading = true
			})
			.addCase(
				createResendConfirmCode.fulfilled,
				(state, action: PayloadAction<ResendConfirmCodeResponse>) => {
					state.isLoading = false
					state.isSuccess = true
					// state.isInvalidCode = false
					state.email = action.payload
				}
			)
			.addCase(createResendConfirmCode.rejected, state => {
				state.isLoading = false
				state.isSuccess = false
				state.isError = true
				// state.isInvalidCode = true
			})
	},
})

export const {
	reset,
	resetWithoutIsLoading,
	resetIsCountdown,
	resetShowCountdown,
	setIsCountdown,
	setShowCountdown,
	setIsDone,
	resetIsDone,
	setResendCode,
	resetResendCode,
	setIsInvalidCode,
	resetIsInvalidCode,
} = confirmCodeSlice.actions
export default confirmCodeSlice.reducer
