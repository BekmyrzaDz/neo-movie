import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchCollectionList } from './asyncActions'

interface ICollection {
	id: number
	name: string
	image: string
}

interface IMovieState {
	collectionList: ICollection[]
	isLoading: boolean
	isSuccess: boolean
	isError: boolean
}

const initialState: IMovieState = {
	collectionList: [],
	isLoading: false,
	isSuccess: false,
	isError: false,
}

const collectionSlice = createSlice({
	name: 'collection',
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
			.addCase(fetchCollectionList.pending, state => {
				state.isLoading = true
			})
			.addCase(
				fetchCollectionList.fulfilled,
				(state, action: PayloadAction<ICollection[]>) => {
					state.isLoading = false
					state.isSuccess = true
					state.collectionList = action.payload
				}
			)
			.addCase(fetchCollectionList.rejected, state => {
				state.isLoading = false
				state.isError = true
			})
	},
})

export const { reset } = collectionSlice.actions
export default collectionSlice.reducer
