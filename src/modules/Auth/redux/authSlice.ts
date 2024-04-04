import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createAuthUser } from './asyncActions'

interface LoginResponse {
	access: string
	refresh: string
}

interface LoginState {
	user: LoginResponse | null
	isLoading: boolean
	isSuccess: boolean
	isError: boolean
}

const initialState: LoginState = {
	user: null,
	isLoading: false,
	isSuccess: false,
	isError: false,
}

export const authSlice = createSlice({
	name: 'auth',
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
			.addCase(createAuthUser.pending, state => {
				state.isLoading = true
			})
			.addCase(
				createAuthUser.fulfilled,
				(state, action: PayloadAction<LoginResponse>) => {
					state.isLoading = false
					state.isSuccess = true
					state.user = action.payload
				}
			)
			.addCase(createAuthUser.rejected, state => {
				state.isLoading = false
				state.isError = true
			})
	},
})

export const { reset } = authSlice.actions
export default authSlice.reducer
