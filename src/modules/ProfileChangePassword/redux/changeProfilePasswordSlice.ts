import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { changeProfilePassword } from './asyncActions'

interface IChangeProfilePassword {
	current_password: string
	new_password: string
	password_confirm: string
}

interface ChangeProfileState {
	password: IChangeProfilePassword | null
	isLoading: boolean
	isSuccess: boolean
	isError: boolean
}

const initialState: ChangeProfileState = {
	password: null,
	isLoading: false,
	isSuccess: false,
	isError: false,
}

export const changeProfilePasswordSlice = createSlice({
	name: 'changeProfilePassword',
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
			.addCase(changeProfilePassword.pending, state => {
				state.isLoading = true
			})
			.addCase(
				changeProfilePassword.fulfilled,
				(state, action: PayloadAction<IChangeProfilePassword>) => {
					state.isLoading = false
					state.isSuccess = true
					state.password = action.payload
				}
			)
			.addCase(changeProfilePassword.rejected, state => {
				state.isLoading = false
				state.isError = true
			})
	},
})

export const { reset } = changeProfilePasswordSlice.actions
export default changeProfilePasswordSlice.reducer
