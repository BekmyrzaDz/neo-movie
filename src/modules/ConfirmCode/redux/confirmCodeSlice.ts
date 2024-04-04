import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createConfirmCode } from './asyncActions'

interface ConfirmCodeResponse {
	code: string
}

interface ConfirmCodeState {
	code: ConfirmCodeResponse | null
	isLoading: boolean
	isSuccess: boolean
	isError: boolean
}

const initialState: ConfirmCodeState = {
	code: null,
	isLoading: false,
	isSuccess: false,
	isError: false,
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
					state.code = action.payload
				}
			)
			.addCase(createConfirmCode.rejected, state => {
				state.isLoading = false
				state.isError = true
			})
	},
})

export const { reset } = confirmCodeSlice.actions
export default confirmCodeSlice.reducer
