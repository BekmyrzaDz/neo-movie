import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchSavedByType } from './asyncActions'

interface ISaved {
	id: number
	title: string
	image: string
	country_of_origin?: string
	rating?: number
	collection?: {
		name?: string
	}
}

interface ISavedListData {
	page: number
	count1: number
	next: string
	previous: string | null
	results: ISaved[]
}

interface ISavedState {
	saved: ISavedListData | null
	isLoading: boolean
	isSuccess: boolean
	isError: boolean
}

const initialState: ISavedState = {
	saved: null,
	isLoading: false,
	isSuccess: false,
	isError: false,
}

export const savedSlice = createSlice({
	name: 'saved',
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
			.addCase(fetchSavedByType.pending, state => {
				state.isLoading = true
			})
			.addCase(
				fetchSavedByType.fulfilled,
				(state, action: PayloadAction<ISavedListData>) => {
					state.isLoading = false
					state.isSuccess = true
					state.saved = action.payload
				}
			)
			.addCase(fetchSavedByType.rejected, state => {
				state.isLoading = false
				state.isError = true
			})
	},
})

export const { reset } = savedSlice.actions
export default savedSlice.reducer