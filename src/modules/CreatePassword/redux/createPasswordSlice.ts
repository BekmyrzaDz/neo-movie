import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createNewPassword } from './asyncActions'

interface ICreatePassword {
	new_password: string
	password_confirm: string
}

interface CreatePasswordState {
	newPassword: ICreatePassword | null
	isLoading: boolean
	isSuccess: boolean
	isError: boolean
}

const initialState: CreatePasswordState = {
	newPassword: null,
	isLoading: false,
	isSuccess: false,
	isError: false,
}

export const createPasswordSlice = createSlice({
	name: 'createPassword',
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
			.addCase(createNewPassword.pending, state => {
				state.isLoading = true
			})
			.addCase(
				createNewPassword.fulfilled,
				(state, action: PayloadAction<ICreatePassword>) => {
					state.isLoading = false
					state.isSuccess = true
					state.newPassword = action.payload
				}
			)
			.addCase(createNewPassword.rejected, state => {
				state.isLoading = false
				state.isError = true
			})
	},
})

export const { reset } = createPasswordSlice.actions
export default createPasswordSlice.reducer
