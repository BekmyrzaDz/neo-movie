import { combineReducers, configureStore } from '@reduxjs/toolkit'
import homeReducer from '../modules/Home/redux/homeSlice'
import movieReducer from '../modules/Movie/redux/movieSlice'

const rootReducer = combineReducers({
	home: homeReducer,
	movie: movieReducer,
})

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
	})
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
