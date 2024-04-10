import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchUser } from './asyncActions'

interface ProfileResponse {
	id: number
	username: string
	email: string
}

interface ProfileState {
	user: ProfileResponse | null
	isLoading: boolean
	isSuccess: boolean
	isError: boolean
}

const initialState: ProfileState = {
	user: null,
	isLoading: false,
	isSuccess: false,
	isError: false,
}

export const profileSlice = createSlice({
	name: 'profile',
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
			.addCase(fetchUser.pending, state => {
				state.isLoading = true
			})
			.addCase(
				fetchUser.fulfilled,
				(state, action: PayloadAction<ProfileResponse>) => {
					state.isLoading = false
					state.isSuccess = true
					state.user = action.payload
				}
			)
			.addCase(fetchUser.rejected, state => {
				state.isLoading = false
				state.isError = true
			})
	},
})

export const { reset } = profileSlice.actions
export default profileSlice.reducer
