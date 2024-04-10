import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { changeUser, fetchUser } from './asyncActions'

interface ChangeProfileResponse {
	id: number
	username: string
	email: string
}

interface ChangeProfileState {
	user: ChangeProfileResponse | null
	changedUser: ChangeProfileResponse | null
	isLoading: boolean
	isSuccess: boolean
	isError: boolean
}

const initialState: ChangeProfileState = {
	user: null,
	changedUser: null,
	isLoading: false,
	isSuccess: false,
	isError: false,
}

export const changeProfileSlice = createSlice({
	name: 'changeProfile',
	initialState,
	reducers: {
		reset: state => {
			state.isLoading = false
			state.isSuccess = false
			state.isError = false
		},
		setChangeProfile: (state, action) => {
			state.user = action.payload
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchUser.pending, state => {
				state.isLoading = true
			})
			.addCase(
				fetchUser.fulfilled,
				(state, action: PayloadAction<ChangeProfileResponse>) => {
					state.isLoading = false
					state.isSuccess = true
					state.user = action.payload
				}
			)
			.addCase(fetchUser.rejected, state => {
				state.isLoading = false
				state.isError = true
			})
			.addCase(changeUser.pending, state => {
				state.isLoading = true
			})
			.addCase(
				changeUser.fulfilled,
				(state, action: PayloadAction<ChangeProfileResponse>) => {
					state.isLoading = false
					state.isSuccess = true
					state.changedUser = action.payload
				}
			)
			.addCase(changeUser.rejected, state => {
				state.isLoading = false
				state.isError = true
			})
	},
})

export const { reset, setChangeProfile } = changeProfileSlice.actions
export default changeProfileSlice.reducer
